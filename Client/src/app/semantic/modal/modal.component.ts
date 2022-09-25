import * as angular from '@angular/core'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any

@angular.Component({
    selector: 'app-semantic-modal',
    styleUrls: ['./modal.component.scss'],
    templateUrl: './modal.component.html',
})
export class ModalComponent implements angular.OnChanges, angular.AfterViewInit, angular.OnDestroy {
    @angular.ViewChild('dialog') dialog?: angular.ElementRef<HTMLDivElement>

    @angular.Input() title = 'Bestätigung erforderlich'

    @angular.Input() show = false

    @angular.Output() closed = new angular.EventEmitter<void>()

    @angular.Output() confirm = new angular.EventEmitter<void>()

    onClose(): void {
        $(this.dialog?.nativeElement)?.modal('hide')
    }

    onConfirm(): void {
        this.confirm.emit()
    }

    ngAfterViewInit(): void {
        $(this.dialog?.nativeElement).modal({
            onHidden: () => this.closed.emit(),
        })
    }

    ngOnChanges(changes: angular.SimpleChanges): void {
        const show = changes['show']

        if (!show) {
            return
        }

        $(this.dialog?.nativeElement)?.modal(show.currentValue ? 'show' : 'hide')
    }

    ngOnDestroy(): void {
        $(this.dialog?.nativeElement)?.modal('destroy')
    }
}
