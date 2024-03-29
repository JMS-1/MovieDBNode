import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

import { IRecording } from '../../../api'
import { ContainerService } from '../../services/containers/container.service'
import { IWorkingCopy } from '../../services/edit.service'
import { ISelectItem } from '../../utils'

@Component({
    selector: 'app-recording-container',
    styleUrls: ['./container.component.scss'],
    templateUrl: './container.component.html',
})
export class RecordingContainerComponent implements OnInit, OnDestroy {
    private _container?: Subscription

    @Input() edit?: IRecording & IWorkingCopy

    ordered: ISelectItem[] = []

    constructor(private readonly _service: ContainerService) {}

    ngOnInit(): void {
        this._container = this._service.map.subscribe(
            (m) =>
                (this.ordered = Object.keys(m)
                    .map((id) => ({ key: id, text: m[id].fullName || id }))
                    .sort((l, r) => l.text.toLocaleLowerCase().localeCompare(r.text.toLocaleLowerCase())))
        )
    }

    ngOnDestroy(): void {
        this._container?.unsubscribe()
    }

    get container(): string {
        return this.edit?.containerId || ''
    }

    set container(containerId: string) {
        if (this.edit) {
            this.edit.containerId = containerId || undefined
        }
    }

    get position(): string {
        return this.edit?.containerPosition || ''
    }

    set position(containerPosition: string) {
        if (this.edit) {
            this.edit.containerPosition = containerPosition
        }
    }
}
