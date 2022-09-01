import { Component, OnDestroy, OnInit } from '@angular/core'
import { IRecordingQueryResult } from 'api'
import { Subscription } from 'rxjs'

import { RecordingService } from './services/recordings/recording.service'

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
    private _recordings?: Subscription

    recordings: IRecordingQueryResult = {
        correlationId: '',
        count: 0,
        genres: [],
        languages: [],
        total: 0,
        view: [],
    }

    constructor(private readonly _recordingService: RecordingService) {}

    ngOnInit(): void {
        this._recordings = this._recordingService.query?.subscribe((result) => (this.recordings = result))
    }

    ngOnDestroy(): void {
        this._recordings?.unsubscribe()
    }

    get pageSize(): number {
        return this._recordingService.pageSize
    }

    onPrev(): void {
        this._recordingService.pageSize -= 1
    }

    onNext(): void {
        this._recordingService.pageSize += 1
    }
}
