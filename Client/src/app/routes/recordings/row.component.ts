import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { GenreService } from 'src/app/services/genre/genre.service'
import { LanguageService } from 'src/app/services/languages/language.service'

import { IRecording } from '../../../api'

@Component({
    selector: '[recording]',
    styleUrls: ['./row.component.scss'],
    templateUrl: './row.component.html',
    standalone: false
})
export class RecordingRowComponent implements OnInit, OnDestroy {
    private _languageQuery?: Subscription

    private _genreQuery?: Subscription

    @Input() item: IRecording = undefined as unknown as IRecording

    languages = ''

    genres = ''

    constructor(private readonly _languages: LanguageService, private readonly _genres: GenreService) {}

    get rent(): string {
        return this.item.rentTo || ''
    }

    ngOnInit(): void {
        this._genreQuery = this._genres.map.subscribe((map) => {
            this.genres =
                (this.item.genres || [])
                    .map((l) => map[l]?.name || l)
                    .sort()
                    .join(', ') || '\xa0'
        })

        this._languageQuery = this._languages.map.subscribe((map) => {
            this.languages =
                (this.item.languages || [])
                    .map((l) => map[l]?.name || l)
                    .sort()
                    .join(', ') || '\xa0'
        })
    }

    ngOnDestroy(): void {
        this._languageQuery?.unsubscribe()
        this._genreQuery?.unsubscribe()
    }
}
