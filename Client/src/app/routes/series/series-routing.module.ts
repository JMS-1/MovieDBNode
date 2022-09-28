import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SeriesRouteComponent } from './series.component'

const routes: Routes = [
    {
        component: SeriesRouteComponent,
        path: '',
        pathMatch: 'full',
    },
    {
        component: SeriesRouteComponent,
        path: ':id',
    },
]

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class SeriesRoutingModule {}
