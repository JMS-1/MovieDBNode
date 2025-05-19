import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecordingsService } from 'src/app/services/recordings/recordings.service';
import { SeriesService } from 'src/app/services/series/series.service';

import { createSorted, ISelectItem } from '../../utils';
import { SelectComponent } from 'src/app/semantic/select/select.component';

@Component({
  selector: 'app-series-filter',
  styleUrls: ['./series.component.scss'],
  templateUrl: './series.component.html',
  imports: [SelectComponent],
})
export class SeriesFilterComponent implements OnDestroy {
  private readonly _subscription: Subscription;

  orderedAsItems: ISelectItem[] = [];

  constructor(
    private readonly _series: SeriesService,
    private readonly _recordings: RecordingsService,
  ) {
    this._subscription = createSorted(this._series.map, 'fullName').subscribe(
      (l) => (this.orderedAsItems = l),
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  get selected(): string {
    return this._recordings.series;
  }

  set selected(selected: string) {
    this._recordings.series = selected;
  }
}
