import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ValidationSchema } from 'fastest-validator'
// eslint-disable-next-line import/no-named-as-default
import gql from 'graphql-tag'
import { action, makeObservable, observable } from 'mobx'
import * as React from 'react'
import { HashRouter } from 'react-router-dom'
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
    readonly series: SeriesStore
    readonly translations: TranslationStore

    _outstandingRequests = 0

    inputValidations: Record<string, ValidationSchema> = {}

    updateValidations: Record<string, ValidationSchema> = {}

    errors: string[] = []

    _theme: TThemes = 'default'

    get isBusy(): boolean {
        return this._outstandingRequests > 0
    }

    constructor() {
        makeObservable(this, {
            _outstandingRequests: observable,
            _theme: observable,
            clearErrors: action,
            doneRequest: action,
            errors: observable,
            inputValidations: observable,
            loadValidations: action,
            requestFailed: action,
            setTheme: action,
            setValidations: action,
            startRequest: action,
            updateValidations: observable,
        })

        this.gql = new ApolloClient({
            cache: new InMemoryCache(),
            defaultOptions: { query: { fetchPolicy: 'no-cache' } },
            link: createHttpLink({ fetch, uri: `${window.location.origin}/graphql` }),
        })

        this.containers = new ContainerStore(this)
        this.genres = new GenreStore(this)
        this.languages = new LanguageStore(this)
        this.recordings = new RecordingStore(this)
        this.series = new SeriesStore(this)
        this.translations = new TranslationStore(this)
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public readonly Router: React.FC<{ children?: React.ReactNode }> = (props) => (
        <HashRouter>{props.children}</HashRouter>
    )

    get theme(): TThemes {
        return this._theme
    }

    setTheme(theme: TThemes): void {
        this._theme = theme

        let link = document.getElementById(this._themeId) as HTMLLinkElement

        if (!link) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            link = document.querySelector('head')!.appendChild(document.createElement('link'))

            link.id = this._themeId
            link.rel = 'stylesheet'
        }

        link.href = `${theme}/semantic.min.css`
    }

    clearErrors(): void {
        this.errors.splice(0)
    }

    startRequest(): void {
        this._outstandingRequests += 1
    }

    doneRequest(): void {
        this._outstandingRequests -= 1
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    requestFailed(error: any): void {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    setValidations(all: any): void {
        for (const validation of all) {
            this.inputValidations[validation.name] = JSON.parse(validation.input)
            this.updateValidations[validation.name] = JSON.parse(validation.update)
        }
    }

    async loadValidations(): Promise<void> {
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

            this.setValidations(res.data.validation || [])
        } catch (error) {
            this.requestFailed(error)
        } finally {
            this.doneRequest()
        }
    }
}

export const rootStore = new RootStore()
