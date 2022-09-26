import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

import { IGenre } from '../../../api'

@Component({
    selector: 'app-genre-item',
    styleUrls: ['./item.component.scss'],
    templateUrl: './item.component.html',
})
export class GenreItemComponent {
    @Input() genre: IGenre = undefined as unknown as IGenre

    constructor(private readonly _router: Router) {}

    onSelect(): void {
        this._router.navigate(['genres', this.genre._id])
    }
}
