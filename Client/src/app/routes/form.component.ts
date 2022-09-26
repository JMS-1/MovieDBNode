/* eslint-disable @typescript-eslint/ban-types */

import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core'
import { Subscription } from 'rxjs'
import { EditableService, IWorkingCopy } from 'src/app/services/workingCopy'

@Component({ template: '' })
export abstract class FormComponent<T extends object> implements OnChanges, OnDestroy, OnInit {
    private _query?: Subscription

    @Input() selected = ''

    editId = ''

    edit?: T & IWorkingCopy

    protected _editFactory?: (id: string) => T & IWorkingCopy

    confirm = false

    protected abstract getEditService(): EditableService<T>

    onRemove(): void {
        this.confirm = true
    }

    reload(): void {
        this.edit = this.editId === '@' ? undefined : this._editFactory?.(this.editId)
    }

    ngOnInit(): void {
        this._query = this.getEditService().editFactory.subscribe((f) => {
            this._editFactory = f

            this.reload()
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        const selected = changes['selected']

        if (!selected) {
            return
        }

        if (!selected.firstChange && selected.currentValue === selected.previousValue) {
            return
        }

        this.editId = selected.currentValue ? (selected.currentValue !== 'NEW' && selected.currentValue) || '' : '@'

        this.reload()
    }

    ngOnDestroy(): void {
        this._query?.unsubscribe()
    }
}
