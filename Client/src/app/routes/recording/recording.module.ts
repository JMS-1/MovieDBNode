import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { RecordingContainerComponent } from './container.component'
import { RecordingGenreComponent } from './genre.component'
import { RecordingLanguageComponent } from './language.component'
import { RecordingLinkComponent } from './link.component'
import { RecordingRouteComponent } from './recording.component'
import { RecordingRoutingModule } from './recording-routing.module'
import { RecordingSeriesComponent } from './series.component'
import { RecordingTypeComponent } from './type.component'

import { SharedModule } from '../../shared.module'

@NgModule({
    declarations: [
        RecordingContainerComponent,
        RecordingGenreComponent,
        RecordingLanguageComponent,
        RecordingLinkComponent,
        RecordingRouteComponent,
        RecordingSeriesComponent,
        RecordingTypeComponent,
    ],
    exports: [],
    imports: [CommonModule, SharedModule, FormsModule, RecordingRoutingModule],
})
export class RecordingModule {}
