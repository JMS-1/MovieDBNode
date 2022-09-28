import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { GenreFormComponent } from './form.component'
import { GenreRouteComponent } from './genre.component'
import { GenreItemComponent } from './item.component'
import { GenreListComponent } from './list.component'

import { SharedModule } from '../../shared.module'

@NgModule({
    declarations: [GenreFormComponent, GenreItemComponent, GenreListComponent, GenreRouteComponent],
    exports: [GenreRouteComponent, CommonModule, RouterModule, SharedModule, FormsModule],
    imports: [CommonModule, RouterModule, SharedModule, FormsModule],
})
export class GenreModule {}
