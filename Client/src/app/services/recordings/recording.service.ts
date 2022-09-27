import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Apollo, gql } from 'apollo-angular'
import { IRecording, recordingContainerType } from 'src/api'

import { EditableService } from '../edit.service'
import { ErrorService } from '../error/error.service'
import { ValidationService } from '../validation/validation.service'

export const recordingProps = `
    _id name rentTo series containerId containerPosition containerType created description fullName genres languages
    links { description name url }
`

const queryRecording = gql<{ recordings: { findById: IRecording } }, { id: string }>(`
  query ($id: ID!) {
    recordings {
      findById(_id: $id) {
        ${recordingProps}
      }
    }
  }
`)

@Injectable()
export class RecordingService extends EditableService<IRecording> {
    protected override readonly ignoredFields = new Set(['__typename', '_id', 'created', 'fullName'])

    private _id = ''

    get id(): string {
        return this._id
    }

    set id(id: string) {
        this._id = id

        this.load()
    }

    constructor(gql: Apollo, validation: ValidationService, router: Router, errors: ErrorService) {
        super(gql, 'Recording', 'recordings', recordingProps, validation, router, errors)

        this.load()
    }

    protected override fromServer(item: Partial<IRecording>): Partial<IRecording> {
        item.containerType = recordingContainerType[
            item.containerType || recordingContainerType.Undefined
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
        return {
            containerType: recordingContainerType.Undefined,
            genres: [],
            languages: [],
            links: [],
        }
    }

    protected override load(): void {
        if (this._id) {
            this._errors.serverCall(this._gql.query({ query: queryRecording, variables: { id: this._id } }), (data) => {
                const recording = data.recordings.findById

                this._query.next({ [recording._id]: this.fromServer(recording) as IRecording })

                this.refresh()
            })
        } else {
            this._query.next({})
        }
    }
}
