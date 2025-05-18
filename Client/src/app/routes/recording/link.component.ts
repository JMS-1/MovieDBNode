import { Component, Input } from '@angular/core';

import { ILink, IRecording } from '../../../api';
import { IWorkingCopy } from '../../services/edit.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorsComponent } from '../errors/errors.component';

@Component({
  selector: 'app-recording-link',
  styleUrls: ['./link.component.scss'],
  templateUrl: './link.component.html',
  imports: [CommonModule, FormsModule, ErrorsComponent],
})
export class RecordingLinkComponent {
  @Input({ required: true }) edit!: IRecording & IWorkingCopy;

  active?: ILink = undefined;

  expanded = false;

  get links(): ILink[] {
    return this.edit.links || [];
  }

  addLink(): void {
    const added: ILink = { name: '', url: '' };

    this.edit.links = [...(this.edit.links || []), added];

    this.active = added;
  }

  delLink(): void {
    const links = this.edit.links || [];
    const index = links.findIndex((l) => l === this.active);

    if (index >= 0) {
      links.splice(index, 1);

      this.edit.links = links;
    }
  }

  get current(): number {
    return this.edit.links?.findIndex((l) => l === this.active) ?? -1;
  }

  private validate(): void {
    this.edit.links = this.edit.links || [];
  }

  get name(): string {
    return this.active?.name || '';
  }

  set name(name: string) {
    if (this.active) {
      this.active.name = name;

      this.validate();
    }
  }

  get url(): string {
    return this.active?.url || '';
  }

  set url(url: string) {
    if (this.active) {
      this.active.url = url;

      this.validate();
    }
  }

  get description(): string {
    return this.active?.description || '';
  }

  set description(description: string) {
    if (this.active) {
      this.active.description = description;

      this.validate();
    }
  }
}
