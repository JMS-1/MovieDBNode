import { Component, OnDestroy, OnInit } from '@angular/core'

import { ContainerService, IContainer } from '../../services/containers/container.service'
import { FormComponent } from '../form.component'

@Component({
    selector: 'app-container-form',
    styleUrls: ['./form.component.scss'],
    templateUrl: './form.component.html',
})
export class ContainerFormComponent extends FormComponent<IContainer> implements OnInit, OnDestroy {
    protected getEditService(): ContainerService {
        return this._service
    }

    constructor(private readonly _service: ContainerService) {
        super()
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
}
