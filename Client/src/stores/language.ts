import { ItemStore } from './item'
import { routes } from './routes'

import { ILanguage } from '../../../Server/src/model/client'

export class LanguageStore extends ItemStore<ILanguage> {
    readonly itemProps = '_id name'

    readonly itemScope = 'languages'

    readonly itemRoute = routes.language

    protected readonly validationName = 'Language'

    getName(language: ILanguage): string {
        return language?.name || language?._id
    }

    protected createNew(): ILanguage {
        return { _id: undefined as unknown as string, name: '' }
    }

    protected toProtocol(language: ILanguage): Partial<ILanguage> {
        return { name: language.name }
    }
}
