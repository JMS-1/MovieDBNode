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
    private _query?: ReturnType<RecordingsService['query']>

    private _subscription?: Subscription

    private _queryId = uuid()

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
        this._queryId = uuid()

        this._query = this._recordings.query(this._queryId)

        this._subscription = this._query.subscribe((state) => {
            if (state.loading) {
                return
            }

            if (state.error) {
                return
            }

            const reply = state.data.recordings.query

            if (reply.correlationId !== this._queryId) {
                return
            }

            this.result = reply
        })
    }

    ngOnDestroy(): void {
        this._subscription?.unsubscribe()
    }
}
