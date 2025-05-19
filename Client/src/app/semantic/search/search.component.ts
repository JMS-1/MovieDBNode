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
  @core.ViewChild('search') search?: core.ElementRef<HTMLDivElement>;

  @core.Input() hint = $localize`:@@search.hint:Suche...`;

  @core.Input() text = '';

  @core.Input() clearable = false;

  @core.Output() textChange = new core.EventEmitter<string>();

  onChange(text: string): void {
    this.textChange.emit(text);
  }

  clear(): void {
    if (this.clearable) {
      this.onChange('');
    }
  }
}
