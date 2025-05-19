import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IRecordingQueryResult } from '../../../api';
import { RecordingsService } from '../../services/recordings/recordings.service';
import { RecordingTableComponent } from './table.component';
import { TextFilterComponent } from 'src/app/filters/text/text.component';
import { LanguageFilterComponent } from 'src/app/filters/language/language.component';
import { GenreFilterComponent } from 'src/app/filters/genre/genre.component';
import { SeriesFilterComponent } from 'src/app/filters/series/series.component';
import { RentFilterComponent } from 'src/app/filters/rent/rent.component';
import { PageSizeFilterComponent } from 'src/app/filters/pagesize/pagesize.component';
import { PaginationFilterComponent } from 'src/app/filters/pagination/pagination.component';

@Component({
  selector: 'app-recordings',
  styleUrls: ['./recordings.component.scss'],
  templateUrl: './recordings.component.html',
  imports: [
    GenreFilterComponent,
    LanguageFilterComponent,
    PageSizeFilterComponent,
    PaginationFilterComponent,
    RecordingTableComponent,
    RentFilterComponent,
    SeriesFilterComponent,
    TextFilterComponent,
  ],
})
export class RecordingsRouteComponent implements OnInit, OnDestroy {
  private _query?: Subscription;

  private _result: IRecordingQueryResult = {
    correlationId: '',
    count: 0,
    genres: [],
    languages: [],
    total: 0,
    view: [],
  };

  readonly of = $localize`:@@recordings.count: von `;

  constructor(private readonly _service: RecordingsService) {}

  get total(): number {
    return this._result.total;
  }

  get count(): number {
    return this._result.count;
  }

  onExport(): void {
    this._service.openExport();
  }

  ngOnInit(): void {
    this._query = this._service.result.subscribe(
      (result) => (this._result = result),
    );
  }

  ngOnDestroy(): void {
    this._query?.unsubscribe();
  }

  clear(): void {
    this._service.reset();
  }
}
