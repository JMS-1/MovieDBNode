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

    private _languages?: Subscription

    recordings: IRecordingQueryResult = {
        correlationId: '',
        count: 0,
        genres: [],
        languages: [],
        total: 0,
        view: [],
    }

    languages: Record<string, ILanguage> = {}

    constructor(
        private readonly _recordingService: RecordingService,
        private readonly _languageService: LanguageService
    ) {}

    ngOnInit(): void {
        this._recordings = this._recordingService.query?.subscribe((result) => (this.recordings = result))
        this._languages = this._languageService.query?.subscribe((result) => (this.languages = result))
    }

    ngOnDestroy(): void {
        this._recordings?.unsubscribe()
        this._languages?.unsubscribe()
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
