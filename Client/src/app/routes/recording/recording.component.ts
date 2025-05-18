import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IRecording } from 'src/api';

import { RecordingService } from '../../services/recordings/recording.service';
import { FormComponent } from '../form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorsComponent } from '../errors/errors.component';
import { RecordingLinkComponent } from './link.component';
import { RecordingSeriesComponent } from './series.component';
import { RecordingTypeComponent } from './type.component';
import { RecordingGenreComponent } from './genre.component';
import { RecordingLanguageComponent } from './language.component';
import { RecordingContainerComponent } from './container.component';
import { ModalComponent } from 'src/app/semantic/modal/modal.component';
import { RecordingDeleteComponent } from './recording-delete.component';
import { RecordingRatingComponent } from './recording-rating.component';

@Component({
  selector: 'app-recording',
  styleUrls: ['./recording.component.scss'],
  templateUrl: './recording.component.html',
  imports: [
    CommonModule,
    ErrorsComponent,
    FormsModule,
    ModalComponent,
    RecordingContainerComponent,
    RecordingDeleteComponent,
    RecordingGenreComponent,
    RecordingLanguageComponent,
    RecordingLinkComponent,
    RecordingRatingComponent,
    RecordingSeriesComponent,
    RecordingTypeComponent,
  ],
})
export class RecordingRouteComponent extends FormComponent<IRecording> {
  private _params?: Subscription;

  protected getEditService(): RecordingService {
    return this._service;
  }

  constructor(
    private readonly _service: RecordingService,
    private readonly _route: ActivatedRoute,
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this._params = this._route.params.subscribe((params) => {
      this.select(params['id']);

      this._service.id = this.editId === '@' ? '' : this.editId;
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    this._params?.unsubscribe();
  }

  onSave(clone: boolean): void {
    if (this.edit) {
      this._service.save(this.editId, this.edit, clone);
    }
  }

  onClone(): void {
    if (this.edit) {
      this._service.clone(this.edit);
    }
  }

  onConfirm(): void {
    this._service.remove(this.editId);

    this.confirm = false;
  }

  get name(): string {
    return this.edit?.name || '';
  }

  set name(name: string) {
    if (this.edit) {
      this.edit.name = name;
    }
  }

  get description(): string {
    return this.edit?.description || '';
  }

  set description(description: string) {
    if (this.edit) {
      this.edit.description = description;
    }
  }

  get rentTo(): string {
    return this.edit?.rentTo || '';
  }

  set rentTo(rentTo: string) {
    if (this.edit) {
      this.edit.rentTo = rentTo;
    }
  }
}
