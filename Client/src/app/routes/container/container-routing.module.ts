import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ContainerRouteComponent } from './container.component'

const routes: Routes = [
    {
        component: ContainerRouteComponent,
        path: '',
        pathMatch: 'full',
    },
    {
        component: ContainerRouteComponent,
        path: ':id',
    },
]

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class ContainerRoutingModule {}
