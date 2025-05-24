import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/languages/language.service';

import { ILanguage } from '../../../api';
import { CommonModule } from '@angular/common';
import { LanguageItemComponent } from './item.component';

@Component({
  selector: 'app-language-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
  imports: [CommonModule, LanguageItemComponent],
})
export class LanguageListComponent implements OnInit, OnDestroy {
  private _query?: Subscription;

  constructor(private readonly _service: LanguageService) {}

  @Input() selected = '';

  items: ILanguage[] = [];

  ngOnInit(): void {
    this._query = this._service.map.subscribe(
      (m) =>
        (this.items = Object.keys(m)
          .map((l) => m[l])
          .sort((l, r) =>
            (l.name || l._id)
              .toLocaleLowerCase()
              .localeCompare((r.name || r._id).toLocaleLowerCase()),
          )),
    );
  }

  ngOnDestroy(): void {
    this._query?.unsubscribe();
  }
}
