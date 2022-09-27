import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

import { ContainerService, IContainer } from '../../services/containers/container.service'

@Component({
    selector: 'app-container-list',
    styleUrls: ['./list.component.scss'],
    templateUrl: './list.component.html',
})
export class ContainerListComponent implements OnInit, OnDestroy {
    private _query?: Subscription

    constructor(private readonly _service: ContainerService) {}

    @Input() selected = ''

    items: IContainer[] = []

    private map: Record<string, IContainer> = {}

    private all: IContainer[] = []

    private _filter = ''

    ngOnInit(): void {
        this._query = this._service.map.subscribe((m) => {
            const root = Object.keys(m)
                .map((id) => m[id])
                .filter((c) => !c.parentId || !m[c.parentId])

            root.sort((l, r) =>
                (l.name || l._id).toLocaleLowerCase().localeCompare((r.name || r._id).toLocaleLowerCase())
            )

            const list: IContainer[] = []

            const addNode = (node: IContainer): void => {
                list.push(node)

                node.children?.forEach(addNode)
            }

            root.forEach(addNode)

            this.all = list
            this.map = m

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
            this.all
                .filter((c) => !filter || (c.fullName || c.name || c._id).toLocaleLowerCase().indexOf(filter) >= 0)
                .map((c) => c._id)
        )

        for (let id of Array.from(visible)) {
            for (;;) {
                const container = this.map[id]

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
