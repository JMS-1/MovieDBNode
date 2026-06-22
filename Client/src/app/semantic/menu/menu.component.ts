import { CommonModule } from '@angular/common';
import * as core from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any;

export interface IMenuItem {
  active?: boolean;
  route: string;
  text: string;
}

@core.Component({
  selector: 'app-sub-menu',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html',
  imports: [CommonModule],
})
export class SubMenuComponent implements core.AfterViewInit, core.OnDestroy {
  readonly menu = core.viewChild<core.ElementRef<HTMLDivElement>>('menu');

  readonly title = core.input('');

  readonly icon = core.input('help');

  readonly items = core.input<IMenuItem[]>([]);

  readonly onSelect = core.output<string>();

  select(route: string): void {
    this.onSelect.emit(route);
  }

  ngAfterViewInit(): void {
    const elem = $(this.menu()?.nativeElement);

    elem.dropdown();

    setTimeout(() => elem.css('visibility', ''), 100);
  }

  ngOnDestroy(): void {
    $(this.menu()?.nativeElement)?.dropdown('destroy');
  }
}
