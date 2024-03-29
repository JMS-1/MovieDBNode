import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { ContainerRouteComponent } from './container.component'
import { ContainerRoutingModule } from './container-routing.module'
import { ContainerFormComponent } from './form.component'
import { ContainerIconComponent } from './icon.component'
import { ContainerItemComponent } from './item.component'
import { ContainerListComponent } from './list.component'
import { ContainerTypeComponent } from './type.component'

import { SharedModule } from '../../shared.module'

@NgModule({
    declarations: [
        ContainerFormComponent,
        ContainerIconComponent,
        ContainerItemComponent,
        ContainerListComponent,
        ContainerRouteComponent,
        ContainerTypeComponent,
    ],
    exports: [],
    imports: [ContainerRoutingModule, CommonModule, SharedModule, RouterModule, FormsModule],
})
export class ContainerModule {}
