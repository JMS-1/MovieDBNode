import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core'
import { ILanguage } from 'api'
import { Subscription } from 'rxjs'
import { LanguageService } from 'src/app/services/languages/language.service'
import { IWorkingCopy } from 'src/app/services/workingCopy'

@Component({
    selector: 'app-language-form',
    styleUrls: ['./form.component.scss'],
    templateUrl: './form.component.html',
})
export class LanguageFormComponent implements OnChanges, OnInit, OnDestroy {
    private _query?: Subscription

    @Input() language = ''

    editId = ''

    edit?: ILanguage & IWorkingCopy

    private _editFactory?: (id: string) => ILanguage & IWorkingCopy

    confirm = false

    constructor(private readonly _service: LanguageService) {}

    onSave(): void {
        if (this.edit) {
            this._service.addOrUpdate(this.editId, this.edit)
        }
    }

    onConfirm(): void {
        this._service.remove(this.editId)

        this.confirm = false
    }

    onRemove(): void {
        this.confirm = true
    }

    reload(): void {
        this.edit = this._editFactory?.(this.editId)
    }

    get name(): string {
        return this.edit?.name || ''
    }

    set name(name: string) {
        if (this.edit) {
            this.edit.name = name
        }
    }

    ngOnInit(): void {
        this._query = this._service.editFactory.subscribe((f) => {
            this._editFactory = f

            this.reload()
        })
    }

    ngOnDestroy(): void {
        this._query?.unsubscribe()
    }

    ngOnChanges(changes: SimpleChanges): void {
        const language = changes['language']

        if (!language) {
            return
        }

        if (!language.firstChange && language.currentValue === language.previousValue) {
            return
        }

        this.editId = (language.currentValue !== 'NEW' && language.currentValue) || ''

        this.reload()
    }
}
