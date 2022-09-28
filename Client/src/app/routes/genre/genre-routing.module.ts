import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GenreRouteComponent } from './genre.component'

const routes: Routes = [
    {
        component: GenreRouteComponent,
        path: '',
        pathMatch: 'full',
    },
    {
        component: GenreRouteComponent,
        path: ':id',
    },
]

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class GenreRoutingModule {}
