import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { GenreService } from '../..//services/genre/genre.service';
import { RecordingsService } from '../../services/recordings/recordings.service';
import { createSorted, ISelectItem } from '../../utils';
import { MultiSelectComponent } from 'src/app/semantic/multi/multi.component';

@Component({
  selector: 'app-genre-filter',
  styleUrls: ['./genre.component.scss'],
  templateUrl: './genre.component.html',
  imports: [MultiSelectComponent],
})
export class GenreFilterComponent implements OnDestroy {
  private readonly _subscription: Subscription;

  orderedAsItems: ISelectItem[] = [];

  constructor(
    private readonly _genres: GenreService,
    private readonly _recordings: RecordingsService,
  ) {
    this._subscription = createSorted(this._genres.map, 'name').subscribe(
      (l) => (this.orderedAsItems = l),
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  get selected(): string[] {
    return this._recordings.genres || [];
  }

  set selected(selected: string[]) {
    this._recordings.genres = selected;
  }
}
