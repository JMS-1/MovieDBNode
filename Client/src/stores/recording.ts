import { BasicItemStore } from './item'

import { IRecording } from '../../../Server/src/model'

export class RecordingStore extends BasicItemStore<IRecording> {
    protected readonly itemProps =
        '_id containerId containerPosition containerType created description fullName genres languages links { description name url } name rentTo'

    protected readonly itemScope = 'recordings'

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
            genres: recording.genres,
            languages: recording.languages,
            links: recording.links.map((l) => ({ description: l.description, name: l.name, url: l.url })),
            name: recording.name,
            rentTo: recording.rentTo || null,
            series: recording.series || null,
        }
    }
}
