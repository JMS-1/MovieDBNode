import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { RecordingService } from 'src/app/services/recordings/recording.service'
import { SeriesService } from 'src/app/services/series/series.service'

import { createSorted, ISelectItem } from '../../utils'

@Component({
    selector: 'app-series-filter',
    styleUrls: ['./series.component.scss'],
    templateUrl: './series.component.html',
})
export class SeriesFilterComponent implements OnDestroy {
    private readonly _subscription: Subscription

    orderedAsItems: ISelectItem[] = []

    constructor(private readonly _series: SeriesService, private readonly _recordings: RecordingService) {
        this._subscription = createSorted(this._series.map, 'fullName').subscribe((l) => (this.orderedAsItems = l))
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe()
    }

    get selected(): string {
        return this._recordings.series
    }

    set selected(selected: string) {
        this._recordings.series = selected
    }
}
