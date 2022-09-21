import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { GenreService } from '../..//services/genre/genre.service'
import { RecordingService } from '../..//services/recordings/recording.service'
import { createSorted, ISelectItem } from '../../utils'

@Component({
    selector: 'app-genre-filter',
    styleUrls: ['./genre.component.scss'],
    templateUrl: './genre.component.html',
})
export class GenreFilterComponent implements OnDestroy {
    private readonly _subscription: Subscription

    orderedAsItems: ISelectItem[] = []

    constructor(private readonly _genres: GenreService, private readonly _recordings: RecordingService) {
        this._subscription = createSorted(this._genres.map, 'name').subscribe((l) => (this.orderedAsItems = l))
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe()
    }

    get selected(): string[] {
        return this._recordings.genres || []
    }

    set selected(selected: string[]) {
        this._recordings.genres = selected
    }
}
