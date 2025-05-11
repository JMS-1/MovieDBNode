import { Component, Input } from '@angular/core'

import { IGenre } from '../../../api'

@Component({
    selector: 'app-genre-item',
    styleUrls: ['./item.component.scss'],
    templateUrl: './item.component.html',
    standalone: false
})
export class GenreItemComponent {
    @Input() genre: IGenre = undefined as unknown as IGenre
}
