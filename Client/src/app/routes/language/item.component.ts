import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

import { ILanguage } from '../../../api'

@Component({
    selector: 'app-language-item',
    styleUrls: ['./item.component.scss'],
    templateUrl: './item.component.html',
})
export class LanguageItemComponent {
    @Input() language: ILanguage = undefined as unknown as ILanguage

    constructor(private readonly _router: Router) {}

    onSelect(): void {
        this._router.navigate(['languages', this.language._id])
    }
}
