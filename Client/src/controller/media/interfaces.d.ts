declare module 'movie-db-client' {
    import { Action } from 'redux'

    import { IMedia } from 'movie-db-api'

    interface IMediaState {
        readonly all: IMedia[]
    }

    const enum mediaActions {
        load = 'movie-db.media.load',
    }

    interface ILoadMedia extends Action {
        media: IMedia[]
        type: mediaActions.load
    }
}
