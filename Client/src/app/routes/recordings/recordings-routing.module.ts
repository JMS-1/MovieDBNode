import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { RecordingsRouteComponent } from './recordings.component'

const routes: Routes = [
    {
        component: RecordingsRouteComponent,
        path: '',
    },
]

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class RecordingsRoutingModule {}
