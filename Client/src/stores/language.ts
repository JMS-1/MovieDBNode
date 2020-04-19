import { routes } from 'movie-db-client'

import { ItemStore } from './item'

import { ILanguage } from '../../../Server/src/model'

export class LanguageStore extends ItemStore<ILanguage> {
    protected readonly itemProps = '_id name'

    protected readonly itemScope = 'languages'

    protected readonly itemRoute = routes.language

    protected readonly validationName = 'Language'

    getName(language: ILanguage): string {
        return language?.name || language?._id
    }

    protected createNew(): ILanguage {
        return { _id: undefined, name: '' }
    }

    protected toProtocol(language: ILanguage): Partial<ILanguage> {
        return { name: language.name }
    }
}
