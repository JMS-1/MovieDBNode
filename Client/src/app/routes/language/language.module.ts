import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { LanguageFormComponent } from './form.component'
import { LanguageItemComponent } from './item.component'
import { LanguageRouteComponent } from './language.component'
import { LanguageRoutingModule } from './language-routing.module'
import { LanguageListComponent } from './list.component'

import { SharedModule } from '../../shared.module'

@NgModule({
    declarations: [LanguageFormComponent, LanguageItemComponent, LanguageListComponent, LanguageRouteComponent],
    exports: [],
    imports: [CommonModule, FormsModule, SharedModule, RouterModule, LanguageRoutingModule],
})
export class LanguageModule {}
