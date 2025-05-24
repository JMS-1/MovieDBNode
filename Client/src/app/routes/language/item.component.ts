import { Component, Input } from '@angular/core';

import { ILanguage } from '../../../api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-language-item',
  styleUrls: ['./item.component.scss'],
  templateUrl: './item.component.html',
  imports: [RouterLink],
})
export class LanguageItemComponent {
  @Input() language: ILanguage = undefined as unknown as ILanguage;
}
