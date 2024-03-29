import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { IRecording, recordingContainerType } from 'src/api'

import { recordingProps, RecordingsService } from './recordings.service'

import { EditableService } from '../edit.service'
import { GraphQLService } from '../graphql/graphql.service'
import { ValidationService } from '../validation/validation.service'

const queryRecording = `
  query ($id: ID!) {
    recordings {
      findById(_id: $id) {
        ${recordingProps}
      }
    }
  }
`

@Injectable()
export class RecordingService extends EditableService<IRecording> {
    protected override readonly ignoredFields = new Set(['__typename', '_id', 'created', 'fullName'])

    private _cloneAfterAddOrSave: boolean | Partial<IRecording> = false

    private _id = ''

    get id(): string {
        return this._id
    }

    set id(id: string) {
        this._id = id

        this.load()
    }

    constructor(
        gql: GraphQLService,
        private readonly _recodings: RecordingsService,
        validation: ValidationService,
        router: Router
    ) {
        super(gql, 'Recording', 'recordings', recordingProps, validation, router)

        this.load()
    }

    protected override fromServer(item: Partial<IRecording>): Partial<IRecording> {
        item.containerType = recordingContainerType[
            item.containerType ?? recordingContainerType.Undefined
        ] as unknown as recordingContainerType

        return item
    }

    protected override toServer(item: Partial<IRecording>): Partial<IRecording> {
        item.containerType = recordingContainerType[
            item.containerType as recordingContainerType
        ] as unknown as recordingContainerType

        return item
    }

    protected override createNew(): Partial<IRecording> {
        const clone = this._cloneAfterAddOrSave

        if (typeof clone === 'object') {
            this._cloneAfterAddOrSave = false

            return { ...this.fromServer(clone), name: `Kopie von ${clone.name}` }
        }

        return {
            containerType: recordingContainerType.Undefined,
            genres: [],
            languages: [],
            links: [],
        }
    }

    protected override load(): void {
        if (this._id) {
            this._gql.call(queryRecording, { id: this._id }, (data) => {
                const recording = data.recordings.findById

                this._query.next({ [recording._id]: this.fromServer(recording) as IRecording })

                this.refresh()
            })
        } else {
            this._query.next({})
        }
    }

    save(id: string, data: Partial<IRecording>, clone: boolean): void {
        this._cloneAfterAddOrSave = clone

        super.addOrUpdate(id, data)
    }

    clone(data: Partial<IRecording>): void {
        this._cloneAfterAddOrSave = this.toServer(JSON.parse(JSON.stringify(data)))

        this._router.navigate(['/recordings', 'NEW', 'NEW'])
    }

    protected override afterAdd(added: IRecording): void {
        this._recodings.reload(this._recodings.page)

        this._cloneAfterAddOrSave = this._cloneAfterAddOrSave && added

        if (this._cloneAfterAddOrSave) {
            this._router.navigate(['/recordings', 'NEW', added._id])
        } else {
            this._router.navigateByUrl('/')
        }
    }

    protected override afterUpdate(updated: IRecording): void {
        this._recodings.reload(this._recodings.page)

        this._cloneAfterAddOrSave = this._cloneAfterAddOrSave && updated

        if (this._cloneAfterAddOrSave) {
            this._router.navigate(['/recordings', 'NEW', updated._id])
        } else {
            this._router.navigateByUrl('/')
        }
    }

    protected override afterDelete(_deleted: IRecording): void {
        this._recodings.reload(this._recodings.page)

        this._router.navigateByUrl('/')
    }
}
