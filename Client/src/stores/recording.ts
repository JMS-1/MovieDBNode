import gql from 'graphql-tag'
import { action, computed, observable } from 'mobx'
import { DropdownItemProps } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

import { translations } from '.'
import { BasicItemStore } from './item'
import { routes } from './routes'
import { getGraphQlError } from './utils'

import {
    IRecording,
    TRecordingContainerType,
    IRecordingQueryArgs,
    IRecordingQueryResult,
} from '../../../Server/src/model'

const optionOrder: TRecordingContainerType[] = [
    TRecordingContainerType.Undefined,
    TRecordingContainerType.VideoCD,
    TRecordingContainerType.SuperVideoCD,
    TRecordingContainerType.RecordedDVD,
    TRecordingContainerType.DVD,
    TRecordingContainerType.BluRay,
]

const initialFilter: IRecordingQueryArgs = {
    firstPage: 1,
    fullName: '',
    genres: [],
    language: '',
    pageSize: 15,
    rent: undefined,
    series: [],
    sort: 'created',
    sortOrder: 'Descending',
}

export class RecordingStore extends BasicItemStore<IRecording> {
    readonly itemProps =
        '_id containerId containerPosition containerType created description fullName genres languages links { description name url } name rentTo'

    readonly itemScope = 'recordings'

    readonly itemRoute = routes.recording

    protected readonly validationName = 'Recording'

    private _correlationId = ''

    @observable queryFilter = initialFilter

    @observable queryResult: IRecordingQueryResult = {
        correlationId: '',
        count: 0,
        genres: [],
        languages: [],
        total: 0,
        view: [],
    }

    @action
    setFilterProp<TProp extends keyof IRecordingQueryArgs>(prop: TProp, value: IRecordingQueryArgs[TProp]): void {
        if (value === this.queryFilter[prop]) {
            return
        }

        this.queryFilter[prop] = value

        this.query()
    }

    @action
    reset(): void {
        this.queryFilter = initialFilter

        this.query()
    }

    async query(): Promise<void> {
        this.root.outstandingRequests += 1

        try {
            this._correlationId = uuid()

            const query = gql`
                query (
                    $correlationId: ID!,
                    $firstPage: Int!,
                    $fullName: String,
                    $genres: [String!],
                    $language: String,
                    $pageSize: Int!,
                    $rent: Boolean,
                    $series: [String!],
                    $sort: RecordingSort!,
                    $sortOrder: SortDirection!
                ){ 
                    ${this.itemScope} { query(
                        correlationId: $correlationId,
                        firstPage: $firstPage,
                        fullName: $fullName,
                        genres: $genres,
                        language: $language,
                        pageSize: $pageSize,
                        rent: $rent,
                        series: $series,
                        sort: $sort,
                        sortOrder: $sortOrder
                    ) { correlationId count total genres { _id count } languages { _id count } view { ${this.itemProps} } } }
                }`

            const res = await this.root.gql.query({
                query,
                variables: {
                    ...this.queryFilter,
                    correlationId: this._correlationId,
                    firstPage: this.queryFilter.firstPage - 1,
                },
            })

            const response: IRecordingQueryResult = res.data[this.itemScope].query

            if (response.correlationId === this._correlationId) {
                this.queryResult = response
            }
        } catch (error) {
            alert(getGraphQlError(error))
        } finally {
            this.root.outstandingRequests -= 1
        }
    }

    protected createNew(): IRecording {
        return {
            _id: undefined,
            containerId: undefined,
            containerPosition: undefined,
            containerType: undefined,
            created: undefined,
            description: undefined,
            fullName: undefined,
            genres: [],
            languages: [],
            links: [],
            name: '',
            rentTo: undefined,
            series: undefined,
        }
    }

    protected toProtocol(recording: IRecording): Partial<IRecording> {
        return {
            containerId: recording.containerId || null,
            containerPosition: recording.containerPosition,
            containerType: recording.containerType,
            description: recording.description,
            genres: [...(recording.genres || [])],
            languages: [...(recording.languages || [])],
            links: recording.links.map((l) => ({ description: l.description, name: l.name, url: l.url })),
            name: recording.name,
            rentTo: recording.rentTo || null,
            series: recording.series || null,
        }
    }

    @action
    async load(id: string): Promise<void> {
        this.select(id)

        if (!id || id === 'NEW') {
            return
        }

        this.root.outstandingRequests += 1

        try {
            const query = gql`query ($id: ID!){ ${this.itemScope} { findById(_id: $id) { ${this.itemProps} } } }`

            const res = await this.root.gql.query({ query, variables: { id } })
            const recording: IRecording = res.data[this.itemScope].findById

            if (recording) {
                this._items[recording._id] = recording
            }
        } catch (error) {
            alert(getGraphQlError(error))
        } finally {
            this.root.outstandingRequests -= 1
        }
    }

    @computed({ keepAlive: true })
    get typeAsOptions(): DropdownItemProps[] {
        const mui = translations.strings.media.types

        return optionOrder.map((t) => ({ key: t, text: mui[t], value: t }))
    }

    @computed({ keepAlive: true })
    get rentAsOptions(): DropdownItemProps[] {
        const mui = translations.strings.recording

        return [
            { key: '1', text: mui.yesRent, value: '1' },
            { key: '0', text: mui.noRent, value: '0' },
        ]
    }
}
