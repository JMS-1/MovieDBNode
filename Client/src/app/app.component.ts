import { Component, OnDestroy, OnInit } from '@angular/core'
import { ILanguage, IRecordingQueryResult } from 'api'
import { Subscription } from 'rxjs'

import { LanguageService } from './services/languages/language.service'
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

    constructor(
        private readonly _recordingService: RecordingService,
        private readonly _languageService: LanguageService
    ) {}

    ngOnInit(): void {
        this._recordings = this._recordingService.query?.subscribe((result) => (this.recordings = result))
    }

    ngOnDestroy(): void {
        this._recordings?.unsubscribe()
    }

    get languages(): Record<string, ILanguage> {
        return this._languageService.map
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
