import { Component } from '@angular/core';
import { SelectComponent } from 'src/app/semantic/select/select.component';
import { RecordingsService } from 'src/app/services/recordings/recordings.service';
import { ISelectItem } from 'src/app/utils';

@Component({
  selector: 'app-rating-filter',
  imports: [SelectComponent],
  templateUrl: './rating-filter.component.html',
  styleUrl: './rating-filter.component.scss',
})
export class RatingFilterComponent {
  orderedAsItems: ISelectItem[] = [
    { key: '10', text: $localize`:@@filter.rating.10:10 Punkte` },
    { key: '9', text: $localize`:@@filter.rating.9:mindestens 9 Punkte` },
    { key: '8', text: $localize`:@@filter.rating.8:mindestens 8 Punkte` },
    { key: '7', text: $localize`:@@filter.rating.7:mindestens 7 Punkte` },
    { key: '6', text: $localize`:@@filter.rating.6:mindestens 6 Punkte` },
    { key: '5', text: $localize`:@@filter.rating.5:mindestens 5 Punkte` },
    { key: '4', text: $localize`:@@filter.rating.4:mindestens 4 Punkte` },
    { key: '3', text: $localize`:@@filter.rating.3:mindestens 3 Punkte` },
    { key: '2', text: $localize`:@@filter.rating.2:mindestens 2 Punkte` },
    { key: '1', text: $localize`:@@filter.rating.1:mindestens 1 Punkt` },
  ];

  constructor(private readonly _recordings: RecordingsService) {}

  get selected(): string {
    return this._recordings.rating == null ? '' : `${this._recordings.rating}`;
  }

  set selected(selected: string) {
    this._recordings.rating = selected === '' ? undefined : parseInt(selected);
  }
}
