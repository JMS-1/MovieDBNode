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

    edit?: ILanguage & IWorkingCopy<ILanguage>

    private _editFactory?: (id: string) => ILanguage & IWorkingCopy<ILanguage>

    private editId = ''

    constructor(private readonly _service: LanguageService) {}

    private reload(): void {
        this.edit = this._editFactory?.(this.editId)
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
