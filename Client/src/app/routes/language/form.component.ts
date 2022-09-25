import { Component, OnDestroy, OnInit } from '@angular/core'
import { ILanguage } from 'api'
import { LanguageService } from 'src/app/services/languages/language.service'

import { FormComponent } from '../form.component'

@Component({
    selector: 'app-language-form',
    styleUrls: ['./form.component.scss'],
    templateUrl: './form.component.html',
})
export class LanguageFormComponent extends FormComponent<ILanguage> implements OnInit, OnDestroy {
    protected getEditService(): LanguageService {
        return this._service
    }

    constructor(private readonly _service: LanguageService) {
        super()
    }

    onSave(): void {
        if (this.edit) {
            this._service.addOrUpdate(this.editId, this.edit)
        }
    }

    onConfirm(): void {
        this._service.remove(this.editId)

        this.confirm = false
    }

    get name(): string {
        return this.edit?.name || ''
    }

    set name(name: string) {
        if (this.edit) {
            this.edit.name = name
        }
    }
}
