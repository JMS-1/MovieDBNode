import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-series',
    styleUrls: ['./series.component.scss'],
    templateUrl: './series.component.html',
})
export class SeriesRouteComponent implements OnInit {
    private _query?: Subscription

    selected = ''

    constructor(private readonly _route: ActivatedRoute) {}

    ngOnInit(): void {
        this._query = this._route.params.subscribe((params) => (this.selected = params['id']))
    }

    ngOnDestroy(): void {
        this._query?.unsubscribe()
    }
}
