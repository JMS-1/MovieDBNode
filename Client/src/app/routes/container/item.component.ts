import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

import { IContainer } from '../../services/containers/container.service'

@Component({
    selector: 'app-container-item',
    styleUrls: ['./item.component.scss'],
    templateUrl: './item.component.html',
})
export class ContainerItemComponent {
    @Input() container: IContainer = undefined as unknown as IContainer

    constructor(private readonly _router: Router) {}

    onSelect(): void {
        this._router.navigate(['containers', this.container._id])
    }
}
