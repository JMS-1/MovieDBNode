import { Component, Input } from '@angular/core';

import { ISeriesNode } from '../../services/series/series.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-series-item',
  styleUrls: ['./item.component.scss'],
  templateUrl: './item.component.html',
  imports: [RouterLink],
})
export class SeriesItemComponent {
  @Input() series: ISeriesNode = undefined as unknown as ISeriesNode;
}
