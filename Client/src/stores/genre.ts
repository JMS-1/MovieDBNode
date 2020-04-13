import { ItemStore } from './item'

import { IGenre } from '../../../Server/src/model'

export class GenreStore extends ItemStore<IGenre> {
    protected readonly itemProps = '_id name'

    protected readonly itemScope = 'genres'

    protected readonly validationName = 'Genre'
}
