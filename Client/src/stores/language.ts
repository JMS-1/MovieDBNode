import { ItemStore } from './item'

import { ILanguage } from '../../../Server/src/model'

export class LanguageStore extends ItemStore<ILanguage> {
    protected readonly itemProps = '_id name'

    protected readonly itemScope = 'languages'

    protected readonly validationName = 'Language'
}
