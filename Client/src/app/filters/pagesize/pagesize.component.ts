import { Component } from '@angular/core'
import { RecordingsService } from 'src/app/services/recordings/recordings.service'

interface ISizeItem {
    className: Record<string, boolean>
    count: number
    onClick(): void
}

const sizes = [15, 30, 50, 75, 100, 250]

@Component({
    selector: 'app-page-size-filter',
    styleUrls: ['./pagesize.component.scss'],
    templateUrl: './pagesize.component.html',
    standalone: false
})
export class PageSizeFilterComponent {
    constructor(private readonly _recordingService: RecordingsService) {}

    get size(): number {
        return this._recordingService.pageSize
    }

    get items(): ISizeItem[] {
        return sizes.map((count) => ({
            className: { active: count === this.size, item: true },
            count,
            onClick: () => (this._recordingService.pageSize = count),
        }))
    }
}
