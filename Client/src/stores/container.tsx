import gql from 'graphql-tag'
import { computed, action, observable, makeObservable } from 'mobx'
import * as React from 'react'
import { SemanticICONS, DropdownItemProps, Icon } from 'semantic-ui-react'

import { RootStore } from '.'
import { HierarchyItemStore } from './hierarchicalItem'
import { routes } from './routes'

import { IContainer, TContainerType, IRecording } from '../../../Server/src/model'

const optionOrder = ['Undefined', 'FeatureSet', 'Box', 'Shelf', 'Folder', 'Disk']

export class ContainerStore extends HierarchyItemStore<IContainer> {
    readonly itemProps = '_id name description parentId parentLocation type'

    readonly itemScope = 'containers'

    readonly itemRoute = routes.container

    protected readonly validationName = 'Container'

    @observable private _recordings: IRecording[] = []

    private _recordingId = 0

    constructor(root: RootStore) {
        super(root)

        makeObservable(this, { typesAsOptions: computed({ keepAlive: true }) })
    }

    getName(container: IContainer): string {
        return container?.name || container?._id
    }

    getIcon(container: IContainer): SemanticICONS {
        const type = container?.type

        if (type === undefined) {
            return 'help'
        }

        const { types } = this.root.translations.strings.container

        return types[type as keyof typeof types]?.icon || 'help'
    }

    select(id: string): void {
        super.select(id)

        this.loadRecordings()
    }

    get recordings(): IRecording[] {
        return this._recordings
    }

    protected createNew(): IContainer {
        return {
            _id: undefined,
            description: undefined,
            name: '',
            parentId: undefined,
            parentLocation: undefined,
            type: 'Undefined',
        }
    }

    protected toProtocol(container: IContainer, toSend = false): Partial<IContainer> {
        return {
            description: container.description,
            name: container.name,
            parentId: container.parentId || null,
            parentLocation: container.parentLocation,
            type: toSend ? container.type : (TContainerType[container.type] as TContainerType),
        }
    }

    @action
    private async loadRecordings(): Promise<void> {
        this._recordings = []

        const id = this.selected?._id

        if (!id) {
            return
        }

        const recordingId = ++this._recordingId

        this.root.startRequest()

        try {
            const recordings = this.root.recordings
            const query = gql`query ($id: ID!){ ${recordings.itemScope} { findByContainer(containerId: $id) { ${recordings.itemProps} } } }`

            const res = await this.root.gql.query({ query, variables: { id } })

            if (this._recordingId === recordingId) {
                this._recordings = res.data[recordings.itemScope].findByContainer || []
            }
        } catch (error) {
            this.root.requestFailed(error)
        } finally {
            this.root.doneRequest()
        }
    }

    get typesAsOptions(): DropdownItemProps[] {
        const mui = this.root.translations.strings.container.types

        return optionOrder.map((c: keyof typeof mui) => ({
            key: c,
            text: (
                <span>
                    <Icon name={mui[c].icon} /> {mui[c].title}
                </span>
            ),
            value: c,
        }))
    }
}
