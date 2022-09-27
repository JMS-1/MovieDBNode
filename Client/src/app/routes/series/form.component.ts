import { Component } from '@angular/core'
import { Subscription } from 'rxjs'
import { ISeriesNode, SeriesService } from 'src/app/services/series/series.service'
import { ISelectItem } from 'src/app/utils'

import { FormComponent } from '../form.component'

@Component({
    selector: 'app-series-form',
    styleUrls: ['./form.component.scss'],
    templateUrl: './form.component.html',
})
export class SeriesFormComponent extends FormComponent<ISeriesNode> {
    private _all?: Subscription

    private _map: Record<string, ISeriesNode> = {}

    parentAsItems: ISelectItem[] = []

    protected getEditService(): SeriesService {
        return this._service
    }

    constructor(private readonly _service: SeriesService) {
        super()
    }

    override reload(): void {
        super.reload()

        const forbidden = new Set<string>()

        const addNode = (series: ISeriesNode): void => {
            forbidden.add(series._id)

            for (const child of series.children || []) {
                addNode(child)
            }
        }

        if (this.editId && this.editId !== '@') {
            const series = this._map[this.editId]

            if (series) {
                addNode(series)
            }
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
}
