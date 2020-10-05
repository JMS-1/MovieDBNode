import gql from 'graphql-tag'
import { action, computed, makeObservable, observable } from 'mobx'
import { DropdownItemProps } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid'

import { RootStore, translations } from '.'
import { BasicItemStore } from './basicItem'
import { routes } from './routes'

import * as model from '../../../Server/src/model'
import { TRecordingContainerType } from '../../../Server/src/model'

const optionOrder: model.TRecordingContainerType[] = [
    model.TRecordingContainerType.Undefined,
    model.TRecordingContainerType.VideoCD,
    model.TRecordingContainerType.SuperVideoCD,
    model.TRecordingContainerType.RecordedDVD,
    model.TRecordingContainerType.DVD,
    model.TRecordingContainerType.BluRay,
]

const initialFilter: model.IRecordingQueryArgs = {
    firstPage: 1,
    fullName: '',
    genres: [],
    language: '',
    pageSize: 15,
    rent: undefined,
    series: [],
    sort: 'fullName',
    sortOrder: 'Ascending',
}

export class RecordingStore extends BasicItemStore<model.IRecording> {
    readonly itemProps =
        '_id name rentTo series containerId containerPosition containerType created description fullName genres languages links { description name url }'

    readonly itemScope = 'recordings'

    readonly itemRoute = routes.recording

    protected readonly validationName = 'Recording'

    private _correlationId = ''

    private readonly _query = gql`
        query (
            $correlationId: ID,
            $firstPage: Int!,
            $forExport: Boolean,
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
                forExport: $forExport,
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

    queryFilter = initialFilter

    queryResult: model.IRecordingQueryResult = {
        correlationId: '',
        count: 0,
        genres: [],
        languages: [],
        total: 0,
        view: [],
    }

    constructor(root: RootStore) {
        super(root)

        makeObservable(this, {
            genreCounts: computed({ keepAlive: true }),
            languageCounts: computed({ keepAlive: true }),
            queryFilter: observable,
            queryResult: observable,
            rentAsOptions: computed({ keepAlive: true }),
            typeAsOptions: computed({ keepAlive: true }),
        })
    }

    @action
    setFilterProp<TProp extends keyof model.IRecordingQueryArgs>(
        prop: TProp,
        value: model.IRecordingQueryArgs[TProp]
    ): void {
        if (value === this.queryFilter[prop]) {
            return
        }

        this.queryFilter[prop] = value

        if (prop !== 'firstPage') {
            this.queryFilter.firstPage = 1
        }

        this.query()
    }

    @action
    reset(): void {
        this.queryFilter = initialFilter

        this.query()
    }

    async query(): Promise<void> {
        this.root.startRequest()

        try {
            this._correlationId = uuid()

            const res = await this.root.gql.query({
                query: this._query,
                variables: {
                    ...this.queryFilter,
                    correlationId: this._correlationId,
                    firstPage: this.queryFilter.firstPage - 1,
                },
            })

            const response: model.IRecordingQueryResult = res.data[this.itemScope].query

            if (response.correlationId === this._correlationId) {
                this.queryResult = response
            }
        } catch (error) {
            this.root.requestFailed(error)
        } finally {
            this.root.doneRequest()
        }
    }

    protected createNew(): model.IRecording {
        return {
            _id: undefined,
            containerId: undefined,
            containerPosition: undefined,
            containerType: 'Undefined',
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

    protected toProtocol(recording: model.IRecording, toSend = false): Partial<model.IRecording> {
        return {
            containerId: recording.containerId || null,
            containerPosition: recording.containerPosition,
            containerType: toSend
                ? recording.containerType
                : (TRecordingContainerType[recording.containerType] as TRecordingContainerType),
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

        this.root.startRequest()

        try {
            const query = gql`query ($id: ID!){ ${this.itemScope} { findById(_id: $id) { ${this.itemProps} } } }`

            const res = await this.root.gql.query({ query, variables: { id } })
            const recording: model.IRecording = res.data[this.itemScope].findById

            if (recording) {
                this._items[recording._id] = recording
            }
        } catch (error) {
            this.root.requestFailed(error)
        } finally {
            this.root.doneRequest()
        }
    }

    @action
    async export(): Promise<void> {
        this.root.startRequest()

        try {
            await this.root.gql.query({
                query: this._query,
                variables: {
                    ...this.queryFilter,
                    firstPage: 0,
                    forExport: true,
                    pageSize: 100000,
                    sort: 'fullName',
                    sortOrder: 'Ascending',
                },
            })

            window.open('export', '_blank')
        } catch (error) {
            this.root.requestFailed(error)
        } finally {
            this.root.doneRequest()
        }
    }

    @action
    createCopy(): void {
        const current = this.toProtocol(this.workingCopy, true)

        if (this.workingCopy._id) {
            this.select('')
        } else {
            this.workingCopy.reset()
        }

        for (const key of Object.keys(current)) {
            const field = key as keyof model.IRecording

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.workingCopy[field] = current[field] as any
        }

        this.workingCopy.name = `Kopie von ${this.workingCopy.name}`
    }

    get typeAsOptions(): DropdownItemProps[] {
        const mui = translations.strings.media.types

        return optionOrder.map((t) => ({ key: t, text: mui[t], value: TRecordingContainerType[t] }))
    }

    get rentAsOptions(): DropdownItemProps[] {
        const mui = translations.strings.recording

        return [
            { key: '1', text: mui.yesRent, value: '1' },
            { key: '0', text: mui.noRent, value: '0' },
        ]
    }

    get languageCounts(): Record<string, number> {
        const map: Record<string, number> = {}

        for (const language of this.queryResult.languages) {
            map[language._id] = language.count
        }

        return map
    }

    get genreCounts(): Record<string, number> {
        const map: Record<string, number> = {}

        for (const genre of this.queryResult.genres) {
            map[genre._id] = genre.count
        }

        return map
    }
}
