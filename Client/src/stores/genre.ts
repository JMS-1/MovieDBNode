import { ItemStore } from './item'
import { routes } from './routes'

import { IGenre } from '../../../Server/src/model'

export class GenreStore extends ItemStore<IGenre> {
    readonly itemProps = '_id name'

    readonly itemScope = 'genres'

    readonly itemRoute = routes.genre

    protected readonly validationName = 'Genre'

    getName(genre: IGenre): string {
        return genre?.name || genre?._id
    }

    protected createNew(): IGenre {
        return { _id: undefined as unknown as string, name: '' }
    }

    protected toProtocol(genre: IGenre): Partial<IGenre> {
        return { name: genre.name }
    }
}
