import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IRecording } from '../../../api';
import { IWorkingCopy } from '../../services/edit.service';
import { GenreService } from '../../services/genre/genre.service';
import { ISelectItem } from '../../utils';
import { CommonModule } from '@angular/common';
import { MultiSelectComponent } from 'src/app/semantic/multi/multi.component';
import { ErrorsComponent } from '../errors/errors.component';

@Component({
  selector: 'app-recording-genre',
  styleUrls: ['./genre.component.scss'],
  templateUrl: './genre.component.html',
  imports: [CommonModule, MultiSelectComponent, ErrorsComponent],
})
export class RecordingGenreComponent implements OnInit, OnDestroy {
  private _query?: Subscription;

  @Input() edit?: IRecording & IWorkingCopy;

  ordered: ISelectItem[] = [];

  constructor(private readonly _service: GenreService) {}

  ngOnInit(): void {
    this._query = this._service.map.subscribe(
      (m) =>
        (this.ordered = Object.keys(m)
          .map((id) => ({ key: id, text: m[id].name || id }))
          .sort((l, r) =>
            l.text
              .toLocaleLowerCase()
              .localeCompare(r.text.toLocaleLowerCase()),
          )),
    );
  }

  ngOnDestroy(): void {
    this._query?.unsubscribe();
  }

  get genres(): string[] {
    return this.edit?.genres || [];
  }

  set genres(genres: string[]) {
    if (this.edit) {
      this.edit.genres = genres;
    }
  }
}
