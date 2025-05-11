import * as angular from '@angular/core';

import { containerType } from '../../../api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any;

@angular.Component({
  selector: 'app-component-type',
  styleUrls: ['./type.component.scss'],
  templateUrl: './type.component.html',
  standalone: false,
})
export class ContainerTypeComponent
  implements angular.AfterViewInit, angular.OnChanges, angular.OnDestroy
{
  @angular.ViewChild('selector') selector?: angular.ElementRef<HTMLDivElement>;

  @angular.Input() selected = containerType.Undefined;

  @angular.Output() selectedChange = new angular.EventEmitter<containerType>();

  private setSelected(selected: containerType): void {
    $(this.selector?.nativeElement)?.dropdown(
      'set exactly',
      typeof selected === 'number' ? `${selected}` : [],
    );
  }

  ngAfterViewInit(): void {
    const elem = $(this.selector?.nativeElement);

    elem.dropdown({
      forceSelection: false,
      onChange: (s: string) => this.selectedChange.emit(parseInt(s, 10)),
    });

    setTimeout(() => {
      this.setSelected(this.selected);

      elem.css('visibility', '');
    }, 100);
  }

  ngOnChanges(changes: angular.SimpleChanges): void {
    const selected = changes['selected'];

    if (selected) {
      this.setSelected(selected.currentValue);
    }
  }

  ngOnDestroy(): void {
    $(this.selector?.nativeElement)?.dropdown('destroy');
  }
}
