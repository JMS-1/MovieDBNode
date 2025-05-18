import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as api from 'src/api';

import { recordingProps, RecordingsService } from './recordings.service';

import { EditableService } from '../edit.service';
import { GraphQLService } from '../graphql/graphql.service';
import { ValidationService } from '../validation/validation.service';

const queryRecording = `
  query ($id: ID!) {
    recordings {
      findById(_id: $id) {
        ${recordingProps}
      }
    }
  }
`;

@Injectable()
export class RecordingService extends EditableService<api.IRecording> {
  protected override readonly ignoredFields = new Set([
    '__typename',
    '_id',
    'created',
    'fullName',
  ]);

  private _cloneAfterAddOrSave: boolean | Partial<api.IRecording> = false;

  private _id = '';

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;

    this.load();
  }

  constructor(
    gql: GraphQLService,
    private readonly _recodings: RecordingsService,
    validation: ValidationService,
    router: Router,
  ) {
    super(gql, 'Recording', 'recordings', recordingProps, validation, router);

    this.load();
  }

  protected override fromServer(
    item: Partial<api.IRecording>,
  ): Partial<api.IRecording> {
    item.containerType = api.recordingContainerType[
      item.containerType ?? api.recordingContainerType.Undefined
    ] as unknown as api.recordingContainerType;

    item.deleteType = (item.deleteType == null
      ? undefined
      : api.recordingDeleteType[
          item.deleteType
        ]) as unknown as api.recordingDeleteType;

    return item;
  }

  protected override toServer(
    item: Partial<api.IRecording>,
  ): Partial<api.IRecording> {
    item.containerType = api.recordingContainerType[
      item.containerType as api.recordingContainerType
    ] as unknown as api.recordingContainerType;

    item.deleteType = (item.deleteType == null
      ? undefined
      : api.recordingDeleteType[
          item.deleteType
        ]) as unknown as api.recordingDeleteType;

    return item;
  }

  protected override createNew(): Partial<api.IRecording> {
    const clone = this._cloneAfterAddOrSave;

    if (typeof clone === 'object') {
      this._cloneAfterAddOrSave = false;

      return { ...this.fromServer(clone), name: `Kopie von ${clone.name}` };
    }

    return {
      containerType: api.recordingContainerType.Undefined,
      genres: [],
      languages: [],
      links: [],
    };
  }

  protected override load(): void {
    if (this._id) {
      this._gql.call(queryRecording, { id: this._id }, (data) => {
        const recording = data.recordings.findById;

        this._query.next({
          [recording._id]: this.fromServer(recording) as api.IRecording,
        });

        this.refresh();
      });
    } else {
      this._query.next({});
    }
  }

  save(id: string, data: Partial<api.IRecording>, clone: boolean): void {
    this._cloneAfterAddOrSave = clone;

    super.addOrUpdate(id, data);
  }

  clone(data: Partial<api.IRecording>): void {
    this._cloneAfterAddOrSave = this.toServer(JSON.parse(JSON.stringify(data)));

    this._router.navigate(['/recordings', 'NEW', 'NEW']);
  }

  protected override afterAdd(added: api.IRecording): void {
    this._recodings.reload(this._recodings.page);

    this._cloneAfterAddOrSave = this._cloneAfterAddOrSave && added;

    if (this._cloneAfterAddOrSave) {
      this._router.navigate(['/recordings', 'NEW', added._id]);
    } else {
      this._router.navigateByUrl('/');
    }
  }

  protected override afterUpdate(updated: api.IRecording): void {
    this._recodings.reload(this._recodings.page);

    this._cloneAfterAddOrSave = this._cloneAfterAddOrSave && updated;

    if (this._cloneAfterAddOrSave) {
      this._router.navigate(['/recordings', 'NEW', updated._id]);
    } else {
      this._router.navigateByUrl('/');
    }
  }

  protected override afterDelete(_deleted: api.IRecording): void {
    this._recodings.reload(this._recodings.page);

    this._router.navigateByUrl('/');
  }
}
