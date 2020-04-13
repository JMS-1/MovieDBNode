import { BasicItemStore } from './item'

import { IRecording } from '../../../Server/src/model'

export class RecordingStore extends BasicItemStore<IRecording> {
    protected readonly itemProps =
        '_id containerId containerPosition containerType created description fullName genres languages links { description name url } name rentTo'

    protected readonly itemScope = 'recordings'

    protected readonly validationName = 'Recording'
}
