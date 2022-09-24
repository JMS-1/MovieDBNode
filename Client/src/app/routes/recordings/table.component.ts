import { Component, OnDestroy, OnInit } from '@angular/core'
import { IRecording, IRecordingQueryRequest, IRecordingQueryResult } from 'api'
import { Subscription } from 'rxjs'

import { RecordingService } from '../../services/recordings/recording.service'

@Component({
    selector: 'app-recording-table',
    styleUrls: ['./table.component.scss'],
    templateUrl: './table.component.html',
})
export class RecordingTableComponent implements OnInit, OnDestroy {
    private _query?: Subscription

    private _result: IRecordingQueryResult = {
        correlationId: '',
        count: 0,
        genres: [],
        languages: [],
        total: 0,
        view: [],
    }

    get items(): IRecording[] {
        return this._result.view
    }

    constructor(private readonly _service: RecordingService) {}

    ngOnInit(): void {
        this._query = this._service.result.subscribe((result) => (this._result = result))
    }

    ngOnDestroy(): void {
        this._query?.unsubscribe()
    }

    sort(column: IRecordingQueryRequest['sort']): void {
        this._service.sort(column)
    }

    get ascending(): boolean {
        return this._service.sortOrder === 'Ascending'
    }

    get sortName(): boolean {
        return this._service.sortColumn === 'fullName'
    }

    get sortDate(): boolean {
        return this._service.sortColumn === 'created'
    }
}
