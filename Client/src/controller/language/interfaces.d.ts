declare module 'movie-db-client' {
    import { Action } from 'redux'

    import { ILanguage } from 'movie-db-api'

    interface ILanguageState extends IEditState<ILanguage> {}

    const enum languageActions {
        cancel = 'movie-db.languages.cancel-edit',
        deleted = 'movie-db.languages.delete-done',
        load = 'movie-db.languages.load',
        save = 'movie-db.languages.save',
        saveDone = 'movie-db.languages.save-done',
        select = 'movie-db.languages.select',
        setProp = 'movie-db.languages.set-prop',
    }

    interface ILoadLanguages extends IGenericLoad<ILanguage> {
        type: languageActions.load
    }

    interface ISetLanguageProperty<TProp extends keyof ILanguage> extends ISetGenericProperty<ILanguage, TProp> {
        type: languageActions.setProp
    }

    interface ISelectLanguage extends IGenericSelect {
        type: languageActions.select
    }

    interface ILanguageSaved extends IGenericSaveDone<ILanguage> {
        type: languageActions.saveDone
    }

    interface ILanguageDeleted extends IGenericDeleteDone {
        type: languageActions.deleted
    }

    interface ICancelLanguageEdit extends IGenericCancelEdit {
        type: languageActions.cancel
    }

    interface ISaveLanguage extends Action {
        type: languageActions.save
    }
}
