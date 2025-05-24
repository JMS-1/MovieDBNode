import { Component } from '@angular/core';
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
    { key: '0', text: $localize`:@@filter.delete.none:nicht gelöscht` },
    { key: '1', text: $localize`:@@filter.delete.deleted:gelöscht` },
    {
      key: '2',
      text: $localize`:@@filter.delete.deletable:kann gelöscht werden`,
    },
  ];

  constructor(private readonly _recordings: RecordingsService) {}

  get selected(): string {
    return this._recordings.deleteType != null
      ? `${this._recordings.deleteType}`
      : '';
  }

  set selected(selected: string) {
    this._recordings.deleteType =
      selected === '' ? undefined : parseInt(selected);
  }
}
