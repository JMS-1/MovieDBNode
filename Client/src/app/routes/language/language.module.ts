import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { LanguageFormComponent } from './form.component'
import { LanguageItemComponent } from './item.component'
import { LanguageRouteComponent } from './language.component'
import { LanguageListComponent } from './list.component'

import { SharedModule } from '../../shared.module'

@NgModule({
    declarations: [LanguageFormComponent, LanguageItemComponent, LanguageListComponent, LanguageRouteComponent],
    exports: [LanguageRouteComponent, CommonModule, FormsModule, SharedModule, RouterModule],
    imports: [CommonModule, FormsModule, SharedModule, RouterModule],
})
export class LanguageModule {}
