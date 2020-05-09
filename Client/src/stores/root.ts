import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ValidationSchema } from 'fastest-validator'
import gql from 'graphql-tag'
import { createHashHistory } from 'history'
import { observable, action } from 'mobx'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import fetch from 'node-fetch'
import { v4 as uuid } from 'uuid'

import { ContainerStore } from './container'
import { GenreStore } from './genre'
import { LanguageStore } from './language'
import { RecordingStore } from './recording'
import { SeriesStore } from './series'
import { TranslationStore } from './translations'
import { getMessage } from './utils'

type TThemes = 'default' | 'alternate.1' | 'alternate.2'

export class RootStore {
    private readonly _themeId = uuid()

    readonly containers: ContainerStore
    readonly genres: GenreStore
    readonly gql: ApolloClient<unknown>
    readonly languages: LanguageStore
    readonly recordings: RecordingStore
    readonly router = new RouterStore()
    readonly series: SeriesStore
    readonly translations: TranslationStore

    @observable private _outstandingRequests = 0

    @observable readonly inputValidations: Record<string, ValidationSchema> = {}

    @observable readonly updateValidations: Record<string, ValidationSchema> = {}

    @observable readonly errors: string[] = []

    @observable private _theme: TThemes = 'default'

    get isBusy(): boolean {
        return this._outstandingRequests > 0
    }

    constructor() {
        this.gql = new ApolloClient({
            cache: new InMemoryCache(),
            defaultOptions: { query: { fetchPolicy: 'no-cache' } },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            link: createHttpLink({ fetch: fetch as any, uri: `${window.location.origin}/graphql` }),
        })

        this.containers = new ContainerStore(this)
        this.genres = new GenreStore(this)
        this.languages = new LanguageStore(this)
        this.recordings = new RecordingStore(this)
        this.series = new SeriesStore(this)
        this.translations = new TranslationStore(this)
    }

    get theme(): TThemes {
        return this._theme
    }

    @action
    setTheme(theme: TThemes): void {
        this._theme = theme

        let link = document.getElementById(this._themeId) as HTMLLinkElement

        if (!link) {
            link = document.querySelector('head').appendChild(document.createElement('link'))

            link.id = this._themeId
            link.rel = 'stylesheet'
        }

        link.href = `${theme}/semantic.min.css`
    }

    @action
    clearErrors(): void {
        this.errors.splice(0)
    }

    @action
    startRequest(): void {
        this._outstandingRequests += 1
    }

    @action
    doneRequest(): void {
        this._outstandingRequests -= 1
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @action requestFailed(error: any): void {
        const gql: Error[] = error.graphQLErrors

        if (Array.isArray(gql) && gql.length > 0) {
            gql.forEach((e) => this.errors.push(e.message))
        } else {
            this.errors.push(getMessage(error))
        }
    }

    startup(): void {
        this.setTheme('default')

        this.containers.startup()
        this.genres.startup()
        this.languages.startup()
        this.series.startup()

        this.loadValidations()
    }

    @action
    private async loadValidations(): Promise<void> {
        this.startRequest()

        try {
            const query = gql`
                {
                    validation {
                        name
                        input
                        update
                    }
                }
            `

            const res = await this.gql.query({ query })
            const all = res.data.validation || []

            for (const validation of all) {
                this.inputValidations[validation.name] = JSON.parse(validation.input)
                this.updateValidations[validation.name] = JSON.parse(validation.update)
            }
        } catch (error) {
            this.requestFailed(error)
        } finally {
            this.doneRequest()
        }
    }
}

const browserHistory = createHashHistory()

export const rootStore = new RootStore()
export const history = syncHistoryWithStore(browserHistory, rootStore.router)
