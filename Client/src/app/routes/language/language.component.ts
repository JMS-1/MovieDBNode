import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-language',
    styleUrls: ['./language.component.scss'],
    templateUrl: './language.component.html',
})
export class LanguageRouteComponent implements OnInit, OnDestroy {
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
