import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from 'src/app/shared.module'

import { RecordingsRouteComponent } from './recordings.component'
import { RecordingsRoutingModule } from './recordings-routing.module'
import { RecordingRowComponent } from './row.component'
import { RecordingTableComponent } from './table.component'

import { GenreFilterComponent } from '../../filters/genre/genre.component'
import { LanguageFilterComponent } from '../../filters/language/language.component'
import { PageSizeFilterComponent } from '../../filters/pagesize/pagesize.component'
import { PaginationFilterComponent } from '../../filters/pagination/pagination.component'
import { RentFilterComponent } from '../../filters/rent/rent.component'
import { SeriesFilterComponent } from '../../filters/series/series.component'
import { TextFilterComponent } from '../../filters/text/text.component'

@NgModule({
    declarations: [
        GenreFilterComponent,
        LanguageFilterComponent,
        PageSizeFilterComponent,
        PaginationFilterComponent,
        RecordingRowComponent,
        RecordingsRouteComponent,
        RecordingTableComponent,
        RentFilterComponent,
        SeriesFilterComponent,
        TextFilterComponent,
    ],
    exports: [],
    imports: [CommonModule, RouterModule, SharedModule, RecordingsRoutingModule],
})
export class RecordingsModule {}
