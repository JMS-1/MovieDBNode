import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/languages/language.service';

import { ILanguage } from '../../../api';
import { FormComponent } from '../form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorsComponent } from '../errors/errors.component';
import { ModalComponent } from 'src/app/semantic/modal/modal.component';

@Component({
  selector: 'app-language-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
  imports: [CommonModule, FormsModule, ErrorsComponent, ModalComponent],
})
export class LanguageFormComponent
  extends FormComponent<ILanguage>
  implements OnInit, OnDestroy
{
  protected getEditService(): LanguageService {
    return this._service;
  }

  constructor(private readonly _service: LanguageService) {
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
