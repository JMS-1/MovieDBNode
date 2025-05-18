import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IRecording } from '../../../api';
import { IWorkingCopy } from '../../services/edit.service';
import { SeriesService } from '../../services/series/series.service';
import { ISelectItem } from '../../utils';
import { CommonModule } from '@angular/common';
import { SelectComponent } from 'src/app/semantic/select/select.component';
import { ErrorsComponent } from '../errors/errors.component';

@Component({
  selector: 'app-recording-series',
  styleUrls: ['./series.component.scss'],
  templateUrl: './series.component.html',
  imports: [CommonModule, SelectComponent, ErrorsComponent],
})
export class RecordingSeriesComponent implements OnInit, OnDestroy {
  private _series?: Subscription;

  @Input() edit?: IRecording & IWorkingCopy;

  ordered: ISelectItem[] = [];

  constructor(private readonly _service: SeriesService) {}

  ngOnInit(): void {
    this._series = this._service.map.subscribe(
      (m) =>
        (this.ordered = Object.keys(m)
          .map((id) => ({ key: id, text: m[id].fullName || id }))
          .sort((l, r) =>
            l.text
              .toLocaleLowerCase()
              .localeCompare(r.text.toLocaleLowerCase()),
          )),
    );
  }

  ngOnDestroy(): void {
    this._series?.unsubscribe();
  }

  get series(): string {
    return this.edit?.series || '';
  }

  set series(series: string) {
    if (this.edit) {
      this.edit.series = series || undefined;
    }
  }
}
