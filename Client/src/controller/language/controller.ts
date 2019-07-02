import { ILanguage } from 'movie-db-api'
import * as local from 'movie-db-client'

import { LanguageActions } from './actions'

import { EditController } from '../controller'

import { ServerApi } from '../../store'

type TLanguageActions =
    | local.ICancelLanguageEdit
    | local.ICloseLanguageDelete
    | local.ILanguageDeleted
    | local.ILanguageSaved
    | local.ILoadLanguages
    | local.ILoadSchemas
    | local.IOpenLanguageDelete
    | local.ISaveLanguage
    | local.ISelectLanguage
    | local.ISetLanguageProperty<any>

const controller = new (class extends EditController<ILanguage, TLanguageActions, local.ILanguageState> {
    protected readonly schema = 'language'

    protected readonly listRoute = local.routes.language

    protected getReducerMap(): local.IActionHandlerMap<TLanguageActions, local.ILanguageState> {
        return {
            [local.applicationActions.loadSchema]: this.loadSchema,
            [local.languageActions.cancel]: this.cancelEdit,
            [local.languageActions.deleted]: this.deleteDone,
            [local.languageActions.hideConfirm]: this.closeDelete,
            [local.languageActions.load]: this.load,
            [local.languageActions.save]: this.startSave,
            [local.languageActions.saveDone]: this.saveDone,
            [local.languageActions.select]: this.select,
            [local.languageActions.setProp]: this.setProperty,
            [local.languageActions.showConfirm]: this.openDelete,
        }
    }

    protected createEmpty(): ILanguage {
        return {
            _id: '',
            name: '',
        }
    }

    private startSave(state: local.ILanguageState, request: local.ISaveLanguage): local.ILanguageState {
        if (state.workingCopy) {
            if (state.workingCopy._id) {
                ServerApi.put(`language/${state.workingCopy._id}`, state.workingCopy, LanguageActions.saveDone)
            } else {
                ServerApi.post('language', state.workingCopy, LanguageActions.saveDone)
            }
        }

        return state
    }

    protected closeDelete(state: local.ILanguageState, request: local.ICloseLanguageDelete): local.ILanguageState {
        state = super.closeDelete(state, request)

        if (request.confirm && state.selected) {
            ServerApi.delete(`language/${state.selected}`, LanguageActions.deleteDone)
        }

        return state
    }
})()

export const LanguageReducer = controller.reducer
