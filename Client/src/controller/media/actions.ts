import { IMediaResponse } from 'movie-db-api'
import { ILoadMedia, mediaActions } from 'movie-db-client'

export class MediaActions {
    static load(response: IMediaResponse): ILoadMedia {
        return { media: response.media, type: mediaActions.load }
    }
}
