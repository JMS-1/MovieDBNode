import { Component, OnDestroy, OnInit } from '@angular/core'
import { IRecordingQueryResult } from 'api'
import { Observable, Subscription } from 'rxjs'
import { v4 as uuid } from 'uuid'

import { RecordingsService } from './services/recordings/recordings.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    private _query?: Subscription

    result: IRecordingQueryResult = {
        correlationId: '',
        count: 0,
        genres: [],
        languages: [],
        total: 0,
        view: [],
    }

    constructor(private readonly _recordings: RecordingsService) {}

    ngOnInit(): void {
        this._query = this._recordings.query.subscribe((result) => (this.result = result))
    }

    ngOnDestroy(): void {
        this._query?.unsubscribe()
    }

    get pageSize(): number {
        return this._recordings.pageSize
    }

    onPrev(): void {
        this._recordings.pageSize -= 1
    }

    onNext(): void {
        this._recordings.pageSize += 1
    }
}
