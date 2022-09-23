import { Component, OnInit } from '@angular/core'
import { IRecording, IRecordingQueryResult } from 'api'
import { Subscription } from 'rxjs'

import { RecordingService } from '../../services/recordings/recording.service'

@Component({
    selector: 'app-recording-table',
    styleUrls: ['./table.component.scss'],
    templateUrl: './table.component.html',
})
export class RecordingTableComponent implements OnInit {
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
}
