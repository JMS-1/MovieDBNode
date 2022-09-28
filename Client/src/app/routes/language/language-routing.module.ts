import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LanguageRouteComponent } from './language.component'

const routes: Routes = [
    {
        component: LanguageRouteComponent,
        path: '',
        pathMatch: 'full',
    },
    {
        component: LanguageRouteComponent,
        path: ':id',
    },
]

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class LanguageRoutingModule {}
