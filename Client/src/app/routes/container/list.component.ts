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

    ngOnInit(): void {
        this._query = this._service.map.subscribe(
            (m) =>
                (this.items = Object.keys(m)
                    .map((l) => m[l])
                    .sort((l, r) =>
                        (l.name || l._id).toLocaleLowerCase().localeCompare((r.name || r._id).toLocaleLowerCase())
                    ))
        )
    }

    ngOnDestroy(): void {
        this._query?.unsubscribe()
    }
}
