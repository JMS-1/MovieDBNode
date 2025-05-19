import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import * as api from '../../../api';
import { RecordingsService } from '../../services/recordings/recordings.service';
import { CommonModule } from '@angular/common';
import { RecordingRowComponent } from './row.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recording-table',
  styleUrls: ['./table.component.scss'],
  templateUrl: './table.component.html',
  imports: [CommonModule, RecordingRowComponent, RouterLink],
})
export class RecordingTableComponent implements OnInit, OnDestroy {
  private _query?: Subscription;

  private _result: api.IRecordingQueryResult = {
    correlationId: '',
    count: 0,
    genres: [],
    languages: [],
    total: 0,
    view: [],
  };

  get items(): api.IRecording[] {
    return this._result.view;
  }

  constructor(private readonly _service: RecordingsService) {}

  ngOnInit(): void {
    this._query = this._service.result.subscribe(
      (result) => (this._result = result),
    );
  }

  ngOnDestroy(): void {
    this._query?.unsubscribe();
  }

  sort(column: api.IRecordingQueryRequest['sort']): void {
    this._service.sort(column);
  }

  get ascending(): boolean {
    return this._service.sortOrder === 'Ascending';
  }

  get sortName(): boolean {
    return this._service.sortColumn === 'fullName';
  }

  get sortDate(): boolean {
    return this._service.sortColumn === 'created';
  }

  get sortRating(): boolean {
    return this._service.sortColumn === 'rating';
  }
}
