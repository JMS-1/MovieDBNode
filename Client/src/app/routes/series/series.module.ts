import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { SeriesFormComponent } from './form.component'
import { SeriesItemComponent } from './item.component'
import { SeriesListComponent } from './list.component'
import { SeriesRouteComponent } from './series.component'
import { SeriesRoutingModule } from './series-routing.module'

import { SharedModule } from '../../shared.module'

@NgModule({
    declarations: [SeriesFormComponent, SeriesItemComponent, SeriesListComponent, SeriesRouteComponent],
    exports: [],
    imports: [CommonModule, SharedModule, RouterModule, FormsModule, SeriesRoutingModule],
})
export class SeriesModule {}
