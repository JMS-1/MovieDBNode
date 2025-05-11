import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { ISeriesNode, SeriesService } from 'src/app/services/series/series.service'

@Component({
    selector: 'app-series-list',
    styleUrls: ['./list.component.scss'],
    templateUrl: './list.component.html',
    standalone: false
})
export class SeriesListComponent implements OnInit, OnDestroy {
    private _query?: Subscription

    constructor(private readonly _service: SeriesService) {}

    @Input() selected = ''

    items: ISeriesNode[] = []

    private all: ISeriesNode[] = []

    private _map: Record<string, ISeriesNode> = {}

    private _filter = ''

    ngOnInit(): void {
        this._query = this._service.map.subscribe((m) => {
            this._map = m

            this.all = Object.keys(m)
                .map((id) => m[id])
                .sort((l, r) => l.fullName.toLocaleLowerCase().localeCompare(r.fullName.toLocaleLowerCase()))

            this.refreshFilter()
        })
    }

    get filter(): string {
        return this._filter
    }

    set filter(filter: string) {
        this._filter = filter

        this.refreshFilter()
    }

    private refreshFilter(): void {
        const filter = (this._filter || '').toLocaleLowerCase()

        const visible = new Set(
            this.all.filter((s) => !filter || s.fullName.toLocaleLowerCase().indexOf(filter) >= 0).map((c) => c._id)
        )

        for (let id of Array.from(visible)) {
            for (;;) {
                const container = this._map[id]

                if (!container) {
                    break
                }

                visible.add(id)

                id = container.parentId || ''
            }
        }

        this.items = this.all.filter((c) => visible.has(c._id))
    }

    ngOnDestroy(): void {
        this._query?.unsubscribe()
    }
}
