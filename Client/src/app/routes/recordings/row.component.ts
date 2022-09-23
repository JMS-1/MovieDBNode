import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { IRecording } from 'api'
import { Subscription } from 'rxjs'
import { GenreService } from 'src/app/services/genre/genre.service'
import { LanguageService } from 'src/app/services/languages/language.service'

@Component({
    selector: '[recording]',
    styleUrls: ['./row.component.scss'],
    templateUrl: './row.component.html',
})
export class RecordingRowComponent implements OnInit, OnDestroy {
    private _languageQuery?: Subscription

    private _genreQuery?: Subscription

    @Input() item: IRecording = undefined as unknown as IRecording

    languages = ''

    genres = ''

    constructor(private readonly _languages: LanguageService, private readonly _genres: GenreService) {}

    ngOnInit(): void {
        this._genreQuery = this._genres.map.subscribe((map) => {
            this.genres = (this.item.genres || [])
                .map((l) => map[l]?.name || l)
                .sort()
                .join(', ')
        })

        this._languageQuery = this._languages.map.subscribe((map) => {
            this.languages = (this.item.languages || [])
                .map((l) => map[l]?.name || l)
                .sort()
                .join(', ')
        })
    }

    ngOnDestroy(): void {
        this._languageQuery?.unsubscribe()
        this._genreQuery?.unsubscribe()
    }
}
