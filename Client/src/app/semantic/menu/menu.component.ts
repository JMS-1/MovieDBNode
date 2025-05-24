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
  @core.ViewChild('menu') menu?: core.ElementRef<HTMLDivElement>;

  @core.Input() title = '';

  @core.Input() icon = 'help';

  @core.Input() items: IMenuItem[] = [];

  @core.Output() onSelect = new core.EventEmitter<string>();

  select(route: string): void {
    this.onSelect.emit(route);
  }

  ngAfterViewInit(): void {
    const elem = $(this.menu?.nativeElement);

    elem.dropdown();

    setTimeout(() => elem.css('visibility', ''), 100);
  }

  ngOnDestroy(): void {
    $(this.menu?.nativeElement)?.dropdown('destroy');
  }
}
