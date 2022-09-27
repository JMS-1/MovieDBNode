import { Component, Input } from '@angular/core'

import { ISeriesNode } from '../../services/series/series.service'

@Component({
    selector: 'app-series-item',
    styleUrls: ['./item.component.scss'],
    templateUrl: './item.component.html',
})
export class SeriesItemComponent {
    @Input() series: ISeriesNode = undefined as unknown as ISeriesNode
}
