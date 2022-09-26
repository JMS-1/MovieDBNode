import { Component } from '@angular/core'
import { Subscription } from 'rxjs'
import { containerType } from 'src/api'
import { ISelectItem } from 'src/app/utils'

import { ContainerService, IContainer, IContainerPosition } from '../../services/containers/container.service'
import { FormComponent } from '../form.component'

@Component({
    selector: 'app-container-form',
    styleUrls: ['./form.component.scss'],
    templateUrl: './form.component.html',
})
export class ContainerFormComponent extends FormComponent<IContainer> {
    private _contents?: Subscription

    private _all?: Subscription

    private _map: Record<string, IContainer> = {}

    contents: IContainerPosition[] = []

    parentAsItems: ISelectItem[] = []

    protected getEditService(): ContainerService {
        return this._service
    }

    constructor(private readonly _service: ContainerService) {
        super()
    }

    override reload(): void {
        super.reload()

        const contents = this._contents

        if (contents) {
            this._contents = undefined

            contents.unsubscribe()
        }

        this.contents = []

        const forbidden = new Set<string>()

        const addNode = (container: IContainer): void => {
            forbidden.add(container._id)

            for (const child of container.children || []) {
                addNode(child)
            }
        }

        if (this.editId && this.editId !== '@') {
            const container = this._map[this.editId]

            if (container) {
                addNode(container)
            }

            this._contents = this._service.getContents(this.editId).subscribe((l) => (this.contents = l))
        }

        this.parentAsItems = Object.keys(this._map)
            .filter((id) => !forbidden.has(id))
            .map((id) => this._map[id])
            .sort((l, r) => l.fullName.toLocaleLowerCase().localeCompare(r.fullName.toLocaleLowerCase()))
            .map((c) => ({ key: c._id, text: c.fullName }))
    }

    override ngOnInit(): void {
        super.ngOnInit()

        this._all = this._service.map.subscribe((m) => {
            this._map = m

            this.reload()
        })
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy()

        this._all?.unsubscribe()
        this._contents?.unsubscribe()
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

    get parentId(): string {
        return this.edit?.parentId || ''
    }

    set parentId(parentId: string) {
        if (this.edit) {
            this.edit.parentId = parentId || undefined
        }
    }

    get parentLocation(): string {
        return this.edit?.parentLocation || ''
    }

    set parentLocation(parentLocation: string) {
        if (this.edit) {
            this.edit.parentLocation = parentLocation
        }
    }

    get type(): containerType {
        return this.edit?.type ?? containerType.Undefined
    }

    set type(type: containerType) {
        if (this.edit) {
            this.edit.type = type
        }
    }
}
