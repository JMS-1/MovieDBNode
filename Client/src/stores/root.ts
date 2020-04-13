import { getMessage } from '@jms-1/isxs-tools'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ValidationSchema } from 'fastest-validator'
import gql from 'graphql-tag'
import { observable, action } from 'mobx'
import fetch from 'node-fetch'

import { ContainerStore } from './container'
import { GenreStore } from './genre'
import { LanguageStore } from './language'
import { RecordingStore } from './recording'
import { SeriesStore } from './series'

export class RootStore {
    readonly containers: ContainerStore
    readonly genres: GenreStore
    readonly gql: ApolloClient<unknown>
    readonly languages: LanguageStore
    readonly recordings: RecordingStore
    readonly series: SeriesStore

    @observable outstandingRequests = 0

    @observable readonly inputValidations: Record<string, ValidationSchema> = {}

    @observable readonly updateValidations: Record<string, ValidationSchema> = {}

    get isBusy(): boolean {
        return this.outstandingRequests > 0
    }

    constructor() {
        this.gql = new ApolloClient({
            cache: new InMemoryCache(),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            link: createHttpLink({ fetch: fetch as any, uri: `${window.location.origin}/graphql` }),
        })

        this.containers = new ContainerStore(this)
        this.genres = new GenreStore(this)
        this.languages = new LanguageStore(this)
        this.recordings = new RecordingStore(this)
        this.series = new SeriesStore(this)
    }

    startup(): void {
        this.containers.startup()
        this.genres.startup()
        this.languages.startup()
        this.series.startup()

        this.loadValidations()
    }

    @action
    private async loadValidations(): Promise<void> {
        this.outstandingRequests += 1

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
            alert(getMessage(error))
        } finally {
            this.outstandingRequests -= 1
        }
    }
}
