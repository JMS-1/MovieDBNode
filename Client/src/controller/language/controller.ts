import { ILanguage } from 'movie-db-api'
import * as local from 'movie-db-client'

import { LanguageActions } from './actions'

import { EditController } from '../controller'

import { ServerApi } from '../../store'

type TLanguageActions =
    | local.ICancelLanguageEdit
    | local.ILanguageSaved
    | local.ILoadLanguages
    | local.ILoadSchemas
    | local.ISaveLanguage
    | local.ISelectLanguage
    | local.ISetLanguageProperty<any>

const controller = new (class extends EditController<ILanguage, TLanguageActions, local.ILanguageState> {
    protected readonly schema = 'language'

    protected readonly afterCancel = local.routes.language

    protected readonly afterSave = local.routes.language

    protected getReducerMap(): local.IActionHandlerMap<TLanguageActions, local.ILanguageState> {
        return {
            [local.applicationActions.loadSchema]: this.loadSchema,
            [local.languageActions.cancel]: this.cancelEdit,
            [local.languageActions.load]: this.load,
            [local.languageActions.save]: this.startSave,
            [local.languageActions.saveDone]: this.saveDone,
            [local.languageActions.select]: this.select,
            [local.languageActions.setProp]: this.setProperty,
        }
    }

    protected createEmpty(): ILanguage {
        return {
            _id: '',
            name: '',
        }
    }

    private startSave(state: local.IGenreState, request: local.ISaveLanguage): local.IGenreState {
        if (state.workingCopy) {
            if (state.workingCopy._id) {
                ServerApi.put(`language/${state.workingCopy._id}`, state.workingCopy, LanguageActions.saveDone)
            } else {
                ServerApi.post('language', state.workingCopy, LanguageActions.saveDone)
            }
        }

        return state
    }
})()

export const LanguageReducer = controller.reducer
