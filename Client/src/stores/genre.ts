import { routes } from 'movie-db-client'

import { ItemStore } from './item'

import { IGenre } from '../../../Server/src/model'

export class GenreStore extends ItemStore<IGenre> {
    protected readonly itemProps = '_id name'

    protected readonly itemScope = 'genres'

    protected readonly itemRoute = routes.genre

    protected readonly validationName = 'Genre'

    getName(genre: IGenre): string {
        return genre?.name || genre?._id
    }

    protected createNew(): IGenre {
        return { _id: undefined, name: '' }
    }

    protected toProtocol(genre: IGenre): Partial<IGenre> {
        return { name: genre.name }
    }
}
