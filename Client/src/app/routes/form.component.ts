import * as core from '@angular/core';
import { Subscription } from 'rxjs';

import { EditableService, IWorkingCopy } from '../services/edit.service';

@core.Component({
  template: '',
  imports: [],
})
export abstract class FormComponent<T extends { _id: string }>
  implements core.OnChanges, core.OnDestroy, core.OnInit
{
  private _query?: Subscription;

  @core.Input() selected = '';

  editId = '';

  edit?: T & IWorkingCopy;

  protected _editFactory?: (id: string) => T & IWorkingCopy;

  confirm = false;

  protected abstract getEditService(): EditableService<T>;

  onRemove(): void {
    this.confirm = true;
  }

  reload(): void {
    this.edit =
      this.editId === '@' ? undefined : this._editFactory?.(this.editId);
  }

  protected select(id: string): void {
    this.editId = id ? (id !== 'NEW' && id) || '' : '@';

    this.reload();
  }

  ngOnInit(): void {
    this._query = this.getEditService().editFactory.subscribe((f) => {
      this._editFactory = f;

      this.reload();
    });
  }

  ngOnChanges(changes: core.SimpleChanges): void {
    const selected = changes['selected'];

    if (!selected) {
      return;
    }

    if (
      !selected.firstChange &&
      selected.currentValue === selected.previousValue
    ) {
      return;
    }

    this.select(selected.currentValue);
  }

  ngOnDestroy(): void {
    this._query?.unsubscribe();
  }
}
