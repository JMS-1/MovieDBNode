import { Component, Input } from '@angular/core'

import { IContainer } from '../../services/containers/container.service'

@Component({
    selector: 'app-container-item',
    styleUrls: ['./item.component.scss'],
    templateUrl: './item.component.html',
})
export class ContainerItemComponent {
    @Input() container: IContainer = undefined as unknown as IContainer
}
