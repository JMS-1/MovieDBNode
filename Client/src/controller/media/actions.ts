import { IMedia } from 'movie-db-api'
import { ILoadMedia, mediaActions } from 'movie-db-client'

export class MediaActions {
    static load(media: IMedia[]): ILoadMedia {
        return { media, type: mediaActions.load }
    }
}
