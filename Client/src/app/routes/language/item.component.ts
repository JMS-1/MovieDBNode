import { Component, Input } from '@angular/core'

import { ILanguage } from '../../../api'

@Component({
    selector: 'app-language-item',
    styleUrls: ['./item.component.scss'],
    templateUrl: './item.component.html',
})
export class LanguageItemComponent {
    @Input() language: ILanguage = undefined as unknown as ILanguage
}
