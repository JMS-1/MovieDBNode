import gql from 'graphql-tag'
import { action, computed } from 'mobx'
import { DropdownItemProps } from 'semantic-ui-react'

import { translations } from '.'
import { BasicItemStore } from './item'
import { routes } from './routes'
import { getGraphQlError } from './utils'

import { IRecording, TRecordingContainerType } from '../../../Server/src/model'

const optionOrder: TRecordingContainerType[] = [
    TRecordingContainerType.Undefined,
    TRecordingContainerType.VideoCD,
    TRecordingContainerType.SuperVideoCD,
    TRecordingContainerType.RecordedDVD,
    TRecordingContainerType.DVD,
    TRecordingContainerType.BluRay,
]

export class RecordingStore extends BasicItemStore<IRecording> {
    readonly itemProps =
        '_id containerId containerPosition containerType created description fullName genres languages links { description name url } name rentTo'

    readonly itemScope = 'recordings'

    readonly itemRoute = routes.recording

    protected readonly validationName = 'Recording'

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
}
