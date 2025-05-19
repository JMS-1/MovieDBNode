import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';

import { RecordingsRoutingModule } from './recordings-routing.module';

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule, RecordingsRoutingModule],
})
export class RecordingsModule {}
