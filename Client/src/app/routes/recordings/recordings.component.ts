import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

import { IRecordingQueryResult } from '../../../api'
import { RecordingsService } from '../../services/recordings/recordings.service'

@Component({
    selector: 'app-recordings',
    styleUrls: ['./recordings.component.scss'],
    templateUrl: './recordings.component.html',
    standalone: false
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

    readonly of = $localize`:@@recordings.count: von `

    constructor(private readonly _service: RecordingsService) {}

    get total(): number {
        return this._result.total
    }

    get count(): number {
        return this._result.count
    }

    onExport(): void {
        this._service.openExport()
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
