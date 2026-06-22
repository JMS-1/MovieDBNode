import * as angular from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any;

@angular.Component({
  selector: 'app-semantic-modal',
  styleUrls: ['./modal.component.scss'],
  templateUrl: './modal.component.html',
  imports: [],
})
export class ModalComponent
  implements angular.OnChanges, angular.AfterViewInit, angular.OnDestroy
{
  readonly dialog =
    angular.viewChild<angular.ElementRef<HTMLDivElement>>('dialog');

  readonly title = angular.input('Bestätigung erforderlich');

  readonly show = angular.input(false);

  readonly closed = angular.output<void>();

  readonly confirm = angular.output<void>();

  onClose(): void {
    $(this.dialog()?.nativeElement)?.modal('hide');
  }

  onConfirm(): void {
    this.confirm.emit();
  }

  ngAfterViewInit(): void {
    $(this.dialog()?.nativeElement).modal({
      onHidden: () => this.closed.emit(),
    });
  }

  ngOnChanges(changes: angular.SimpleChanges): void {
    const show = changes['show'];

    if (!show) {
      return;
    }

    $(this.dialog()?.nativeElement)?.modal(show.currentValue ? 'show' : 'hide');
  }

  ngOnDestroy(): void {
    $(this.dialog()?.nativeElement)?.modal('destroy');
  }
}
