import { CommonModule } from '@angular/common';
import * as core from '@angular/core';
import { FormsModule } from '@angular/forms';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any;

@core.Component({
  selector: 'semantic-search',
  styleUrls: ['./search.component.scss'],
  templateUrl: './search.component.html',
  imports: [CommonModule, FormsModule],
})
export class SearchComponent {
  readonly search = core.viewChild<core.ElementRef<HTMLDivElement>>('search');

  readonly hint = core.input($localize`:@@search.hint:Suche...`);

  readonly text = core.input('');

  readonly clearable = core.input(false);

  readonly textChange = core.output<string>();

  onChange(text: string): void {
    this.textChange.emit(text);
  }

  clear(): void {
    if (this.clearable()) {
      this.onChange('');
    }
  }
}
