import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { GenreFilterComponent } from './filters/genre/genre.component'
import { LanguageFilterComponent } from './filters/language/language.component'
import { PageSizeFilterComponent } from './filters/pagesize/pagesize.component'
import { PaginationFilterComponent } from './filters/pagination/pagination.component'
import { RentFilterComponent } from './filters/rent/rent.component'
import { SeriesFilterComponent } from './filters/series/series.component'
import { TextFilterComponent } from './filters/text/text.component'
import { GraphQLModule } from './graphql.module'
import { RootComponent } from './root/root.component'
import { ContainerRouteComponent } from './routes/container/container.component'
import { ContainerFormComponent } from './routes/container/form.component'
import { ContainerIconComponent } from './routes/container/icon.component'
import { ContainerItemComponent } from './routes/container/item.component'
import { ContainerListComponent } from './routes/container/list.component'
import { ContainerTypeComponent } from './routes/container/type.component'
import { ErrorsComponent } from './routes/errors/errors.component'
import { GenreFormComponent } from './routes/genre/form.component'
import { GenreRouteComponent } from './routes/genre/genre.component'
import { GenreItemComponent } from './routes/genre/item.component'
import { GenreListComponent } from './routes/genre/list.component'
import { LanguageFormComponent } from './routes/language/form.component'
import { LanguageItemComponent } from './routes/language/item.component'
import { LanguageRouteComponent } from './routes/language/language.component'
import { LanguageListComponent } from './routes/language/list.component'
import { MasterDetailComponent } from './routes/master-detail/master-detail.component'
import { RecordingRouteComponent } from './routes/recording/recording.component'
import { RecordingsRouteComponent } from './routes/recordings/recordings.component'
import { RecordingRowComponent } from './routes/recordings/row.component'
import { RecordingTableComponent } from './routes/recordings/table.component'
import { SeriesRouteComponent } from './routes/series/series.component'
import { SubMenuComponent } from './semantic/menu/menu.component'
import { ModalComponent } from './semantic/modal/modal.component'
import { MultiSelectComponent } from './semantic/multi/multi.component'
import { SearchComponent } from './semantic/search/search.component'
import { SelectComponent } from './semantic/select/select.component'
import { ConfigService } from './services/config/config.service'
import { ContainerService } from './services/containers/container.service'
import { ErrorService } from './services/error/error.service'
import { GenreService } from './services/genre/genre.service'
import { LanguageService } from './services/languages/language.service'
import { RecordingService } from './services/recordings/recording.service'
import { SeriesService } from './services/series/series.service'
import { ThemeService } from './services/themes/theme.service'
import { ValidationService } from './services/validation/validation.service'

@NgModule({
    bootstrap: [RootComponent],
    declarations: [
        ContainerFormComponent,
        ContainerIconComponent,
        ContainerItemComponent,
        ContainerListComponent,
        ContainerRouteComponent,
        ContainerTypeComponent,
        ErrorsComponent,
        GenreFilterComponent,
        GenreFormComponent,
        GenreItemComponent,
        GenreListComponent,
        GenreRouteComponent,
        LanguageFilterComponent,
        LanguageFormComponent,
        LanguageItemComponent,
        LanguageListComponent,
        LanguageRouteComponent,
        MasterDetailComponent,
        ModalComponent,
        MultiSelectComponent,
        PageSizeFilterComponent,
        PaginationFilterComponent,
        RecordingRouteComponent,
        RecordingRowComponent,
        RecordingsRouteComponent,
        RecordingTableComponent,
        RentFilterComponent,
        RootComponent,
        SearchComponent,
        SelectComponent,
        SeriesFilterComponent,
        SeriesRouteComponent,
        SubMenuComponent,
        TextFilterComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, GraphQLModule, HttpClientModule, FormsModule],
    providers: [
        ConfigService,
        ContainerService,
        ErrorService,
        GenreService,
        LanguageService,
        RecordingService,
        SeriesService,
        ThemeService,
        ValidationService,
    ],
})
export class AppModule {}
