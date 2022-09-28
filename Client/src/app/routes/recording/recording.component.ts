import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { IRecording } from 'src/api'
import { ContainerService } from 'src/app/services/containers/container.service'
import { ISelectItem } from 'src/app/utils'

import { RecordingService } from '../../services/recordings/recording.service'
import { FormComponent } from '../form.component'

@Component({
    selector: 'app-recording',
    styleUrls: ['./recording.component.scss'],
    templateUrl: './recording.component.html',
})
export class RecordingRouteComponent extends FormComponent<IRecording> {
    private _params?: Subscription

    private _container?: Subscription

    orderedContainers: ISelectItem[] = []

    protected getEditService(): RecordingService {
        return this._service
    }

    constructor(
        private readonly _service: RecordingService,
        private readonly _containerService: ContainerService,
        private readonly _route: ActivatedRoute
    ) {
        super()
    }

    override ngOnInit(): void {
        super.ngOnInit()

        this._params = this._route.params.subscribe((params) => {
            this.select(params['id'])

            this._service.id = this.editId === '@' ? '' : this.editId
        })
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy()

        this._container?.unsubscribe()
        this._params?.unsubscribe()
    }

    onSave(): void {
        if (this.edit) {
            this._service.addOrUpdate(this.editId, this.edit)
        }
    }

    onConfirm(): void {
        this._service.remove(this.editId)

        this.confirm = false
    }

    get name(): string {
        return this.edit?.name || ''
    }

    set name(name: string) {
        if (this.edit) {
            this.edit.name = name
        }
    }

    get description(): string {
        return this.edit?.description || ''
    }

    set description(description: string) {
        if (this.edit) {
            this.edit.description = description
        }
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

    get rentTo(): string {
        return this.edit?.rentTo || ''
    }

    set rentTo(rentTo: string) {
        if (this.edit) {
            this.edit.rentTo = rentTo
        }
    }
}
