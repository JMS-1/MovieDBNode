import { Component } from '@angular/core';
import { recordingDeleteType } from 'src/api';
import { SelectComponent } from 'src/app/semantic/select/select.component';
import { RecordingsService } from 'src/app/services/recordings/recordings.service';
import { ISelectItem } from 'src/app/utils';

@Component({
  selector: 'app-delete-filter',
  imports: [SelectComponent],
  templateUrl: './delete-filter.component.html',
  styleUrl: './delete-filter.component.scss',
})
export class DeleteFilterComponent {
  orderedAsItems: ISelectItem[] = [
    { key: '1', text: $localize`:@@filter.delete.deleted:gelöscht` },
    {
      key: '2',
      text: $localize`:@@filter.delete.deletable:kann gelöscht werden`,
    },
  ];

  constructor(private readonly _recordings: RecordingsService) {}

  get selected(): string {
    return this._recordings.deleteType ? `${this._recordings.deleteType}` : '';
  }

  set selected(selected: string) {
    this._recordings.deleteType =
      selected === '' ? undefined : parseInt(selected);
  }
}
