import { Component, Input } from '@angular/core';

import { IGenre } from '../../../api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-genre-item',
  styleUrls: ['./item.component.scss'],
  templateUrl: './item.component.html',
  imports: [RouterLink],
})
export class GenreItemComponent {
  @Input({ required: true }) genre!: IGenre;
}
