import { Component, OnDestroy, OnInit } from '@angular/core';

import { IGenre } from '../../../api';
import { GenreService } from '../../services/genre/genre.service';
import { FormComponent } from '../form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorsComponent } from '../errors/errors.component';
import { ModalComponent } from 'src/app/semantic/modal/modal.component';

@Component({
  selector: 'app-genre-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
  imports: [CommonModule, FormsModule, ErrorsComponent, ModalComponent],
})
export class GenreFormComponent
  extends FormComponent<IGenre>
  implements OnInit, OnDestroy
{
  protected getEditService(): GenreService {
    return this._service;
  }

  constructor(private readonly _service: GenreService) {
    super();
  }

  onSave(): void {
    if (this.edit) {
      this._service.addOrUpdate(this.editId, this.edit);
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
}
