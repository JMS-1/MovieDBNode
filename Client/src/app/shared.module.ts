import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ErrorsComponent } from './routes/errors/errors.component';
import { MasterDetailComponent } from './routes/master-detail/master-detail.component';
import { ModalComponent } from './semantic/modal/modal.component';
import { MultiSelectComponent } from './semantic/multi/multi.component';
import { SearchComponent } from './semantic/search/search.component';
import { SelectComponent } from './semantic/select/select.component';

@NgModule({
  declarations: [MasterDetailComponent],
  exports: [
    CommonModule,
    ErrorsComponent,
    FormsModule,
    MasterDetailComponent,
    ModalComponent,
    MultiSelectComponent,
    SearchComponent,
    SelectComponent,
  ],
  imports: [
    CommonModule,
    ErrorsComponent,
    FormsModule,
    ModalComponent,
    MultiSelectComponent,
    SearchComponent,
    SelectComponent,
  ],
})
export class SharedModule {}
