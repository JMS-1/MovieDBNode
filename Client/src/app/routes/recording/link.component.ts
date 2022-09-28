import { Component, Input, OnInit } from '@angular/core'

import { ILink, IRecording } from '../../../api'
import { IWorkingCopy } from '../../services/edit.service'

@Component({
    selector: 'app-recording-link',
    styleUrls: ['./link.component.scss'],
    templateUrl: './link.component.html',
})
export class RecordingLinkComponent implements OnInit {
    @Input() edit?: IRecording & IWorkingCopy

    active?: ILink = undefined

    expanded = false

    constructor() {}

    ngOnInit(): void {}

    get links(): ILink[] {
        return this.edit?.links || []
    }

    addLink(): void {
        if (this.edit) {
            const added: ILink = { name: '', url: '' }

            this.edit.links = [...(this.edit.links || []), added]

            this.active = added
        }
    }

    delLink(): void {
        if (this.edit) {
            const links = this.edit.links || []
            const index = links.findIndex((l) => l === this.active)

            if (index >= 0) {
                links.splice(index, 1)

                this.edit.links = links
            }
        }
    }

    get current(): number {
        return this.edit?.links?.findIndex((l) => l === this.active) ?? -1
    }

    private validate(): void {
        if (this.edit) {
            this.edit.links = this.edit.links || []
        }
    }

    get name(): string {
        return this.active?.name || ''
    }

    set name(name: string) {
        if (this.active) {
            this.active.name = name

            this.validate()
        }
    }

    get url(): string {
        return this.active?.url || ''
    }

    set url(url: string) {
        if (this.active) {
            this.active.url = url

            this.validate()
        }
    }

    get description(): string {
        return this.active?.description || ''
    }

    set description(description: string) {
        if (this.active) {
            this.active.description = description

            this.validate()
        }
    }
}
