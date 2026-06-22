import { Component, OnDestroy, OnInit, input } from '@angular/core';
import { Subscription } from 'rxjs';
import { GenreService } from 'src/app/services/genre/genre.service';
import { LanguageService } from 'src/app/services/languages/language.service';

import { IRecording, recordingDeleteType } from '../../../api';
import { CommonModule } from '@angular/common';

const deleted = recordingDeleteType[recordingDeleteType.Deleted] as unknown;
const deletable = recordingDeleteType[recordingDeleteType.Deletable] as unknown;

@Component({
  selector: '[recording]',
  styleUrls: ['./row.component.scss'],
  templateUrl: './row.component.html',
  imports: [CommonModule],
})
export class RecordingRowComponent implements OnInit, OnDestroy {
  private _languageQuery?: Subscription;

  private _genreQuery?: Subscription;

  readonly item = input.required<IRecording>();

  languages = '';

  genres = '';

  readonly stars = [1, 3, 5, 7, 9];

  constructor(
    private readonly _languages: LanguageService,
    private readonly _genres: GenreService,
  ) {}

  get rent(): string {
    return this.item().rentTo || '';
  }

  get hasDelete() {
    const item = this.item();
    return item.deleteType === deleted || item.deleteType === deletable;
  }

  get deleteColor() {
    return this.item().deleteType === deleted ? '#ff0000' : '#ffc000';
  }

  ngOnInit(): void {
    this._genreQuery = this._genres.map.subscribe((map) => {
      this.genres =
        (this.item().genres || [])
          .map((l) => map[l]?.name || l)
          .sort()
          .join(', ') || '\xa0';
    });

    this._languageQuery = this._languages.map.subscribe((map) => {
      this.languages =
        (this.item().languages || [])
          .map((l) => map[l]?.name || l)
          .sort()
          .join(', ') || '\xa0';
    });
  }

  ngOnDestroy(): void {
    this._languageQuery?.unsubscribe();
    this._genreQuery?.unsubscribe();
  }
}
