import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

import { IRecordingQueryResult } from '../../../api'
import { RecordingService } from '../../services/recordings/recording.service'

@Component({
    selector: 'app-recordings',
    styleUrls: ['./recordings.component.scss'],
    templateUrl: './recordings.component.html',
})
export class RecordingsRouteComponent implements OnInit, OnDestroy {
    private _query?: Subscription

    private _result: IRecordingQueryResult = {
        correlationId: '',
        count: 0,
        genres: [],
        languages: [],
        total: 0,
        view: [],
    }

    constructor(private readonly _service: RecordingService) {}

    get total(): number {
        return this._result.total
    }

    get count(): number {
        return this._result.count
    }

    ngOnInit(): void {
        this._query = this._service.result.subscribe((result) => (this._result = result))
    }

    ngOnDestroy(): void {
        this._query?.unsubscribe()
    }

    clear(): void {
        this._service.reset()
    }
}
