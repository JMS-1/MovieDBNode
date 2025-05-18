import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IRecording } from '../../../api';
import { IWorkingCopy } from '../../services/edit.service';
import { LanguageService } from '../../services/languages/language.service';
import { ISelectItem } from '../../utils';
import { CommonModule } from '@angular/common';
import { MultiSelectComponent } from 'src/app/semantic/multi/multi.component';
import { ErrorsComponent } from '../errors/errors.component';

@Component({
  selector: 'app-recording-language',
  styleUrls: ['./language.component.scss'],
  templateUrl: './language.component.html',
  imports: [CommonModule, MultiSelectComponent, ErrorsComponent],
})
export class RecordingLanguageComponent implements OnInit, OnDestroy {
  private _query?: Subscription;

  @Input({ required: true }) edit!: IRecording & IWorkingCopy;

  ordered: ISelectItem[] = [];

  constructor(private readonly _service: LanguageService) {}

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

  get languages(): string[] {
    return this.edit.languages || [];
  }

  set languages(languages: string[]) {
    this.edit.languages = languages;
  }
}
