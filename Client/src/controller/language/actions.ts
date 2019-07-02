import * as api from 'movie-db-api'
import * as local from 'movie-db-client'

export class LanguageActions {
    static load(response: api.ILanguageResponse): local.ILoadLanguages {
        return { list: response.list, type: local.languageActions.load }
    }

    static select(id: string): local.ISelectLanguage {
        return { id, type: local.languageActions.select }
    }

    static setProperty<TProp extends keyof api.ILanguage>(
        prop: TProp,
        value: api.ILanguage[TProp],
    ): local.ISetLanguageProperty<TProp> {
        return { prop, value, type: local.languageActions.setProp }
    }

    static saveDone(response: api.IUpdateLanguageResponse): local.ILanguageSaved {
        return { item: response.item, errors: response.errors, type: local.languageActions.saveDone }
    }

    static deleteDone(response: api.IDeleteLanguageResponse): local.ILanguageDeleted {
        return { id: response.id, errors: response.errors, type: local.languageActions.deleted }
    }

    static cancelEdit(): local.ICancelLanguageEdit {
        return { type: local.languageActions.cancel }
    }

    static save(): local.ISaveLanguage {
        return { type: local.languageActions.save }
    }

    static confirmDelete(): local.IOpenLanguageDelete {
        return { type: local.languageActions.showConfirm }
    }

    static confirmDeleteDone(confirm: boolean): local.ICloseLanguageDelete {
        return { confirm, type: local.languageActions.hideConfirm }
    }
}
