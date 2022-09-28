import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { RecordingRouteComponent } from './recording.component'

const routes: Routes = [
    {
        component: RecordingRouteComponent,
        path: ':id',
    },
]

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class RecordingRoutingModule {}
