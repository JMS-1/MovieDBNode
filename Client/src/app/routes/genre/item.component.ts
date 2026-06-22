import { Component, input } from '@angular/core';

import { IGenre } from '../../../api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-genre-item',
  styleUrls: ['./item.component.scss'],
  templateUrl: './item.component.html',
  imports: [RouterLink],
})
export class GenreItemComponent {
  readonly genre = input.required<IGenre>();
}
