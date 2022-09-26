import { Component, Input } from '@angular/core'
import { containerType } from 'src/api'

const typeMap: Record<containerType, string> = {
    [containerType.Box]: 'briefcase',
    [containerType.Disk]: 'hdd',
    [containerType.FeatureSet]: 'zip',
    [containerType.Folder]: 'folder',
    [containerType.Shelf]: 'building',
    [containerType.Undefined]: 'help',
}

@Component({
    selector: 'app-container-icon',
    styleUrls: ['./icon.component.scss'],
    templateUrl: './icon.component.html',
})
export class ContainerIconComponent {
    @Input() type: containerType = containerType.Undefined

    get iconType(): string {
        return typeMap[this.type] || 'help'
    }
}
