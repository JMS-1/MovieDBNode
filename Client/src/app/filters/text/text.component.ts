import { Component } from '@angular/core';

import { RecordingsService } from '../../services/recordings/recordings.service';
import { SearchComponent } from 'src/app/semantic/search/search.component';

@Component({
  selector: 'app-text-filter',
  styleUrls: ['./text.component.scss'],
  templateUrl: './text.component.html',
  imports: [SearchComponent],
})
export class TextFilterComponent {
  constructor(private readonly _recordings: RecordingsService) {}

  get filter(): string {
    return this._recordings.fullName;
  }

  set filter(filter: string) {
    this._recordings.fullName = filter;
  }
}
