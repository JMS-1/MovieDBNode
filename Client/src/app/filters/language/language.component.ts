import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LanguageService } from '../..//services/languages/language.service';
import { RecordingsService } from '../../services/recordings/recordings.service';
import { createSorted, ISelectItem } from '../../utils';
import { SelectComponent } from 'src/app/semantic/select/select.component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any;

@Component({
  selector: 'app-language-filter',
  styleUrls: ['./language.component.scss'],
  templateUrl: './language.component.html',
  imports: [SelectComponent],
})
export class LanguageFilterComponent implements OnDestroy {
  private readonly _subscription: Subscription;

  orderedAsItems: ISelectItem[] = [];

  constructor(
    private readonly _languages: LanguageService,
    private readonly _recordings: RecordingsService,
  ) {
    this._subscription = createSorted(this._languages.map, 'name').subscribe(
      (l) => (this.orderedAsItems = l),
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  get selected(): string {
    return this._recordings.language;
  }

  set selected(selected: string) {
    this._recordings.language = selected;
  }
}
