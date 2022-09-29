import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any

export interface IMenuItem {
    active?: boolean
    route: string
    text: string
}

@Component({
    selector: 'app-sub-menu',
    styleUrls: ['./menu.component.scss'],
    templateUrl: './menu.component.html',
})
export class SubMenuComponent implements AfterViewInit, OnDestroy {
    @ViewChild('menu') menu?: ElementRef<HTMLDivElement>

    @Input() title = ''

    @Input() icon = 'help'

    @Input() items: IMenuItem[] = []

    @Output() onSelect = new EventEmitter<string>()

    select(route: string): void {
        this.onSelect.emit(route)
    }

    ngAfterViewInit(): void {
        const elem = $(this.menu?.nativeElement)

        elem.dropdown()

        setTimeout(() => elem.css('visibility', ''), 100)
    }

    ngOnDestroy(): void {
        $(this.menu?.nativeElement)?.dropdown('destroy')
    }
}
