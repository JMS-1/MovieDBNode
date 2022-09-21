import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { GenreFilterComponent } from './filters/genre/genre.component'
import { LanguageFilterComponent } from './filters/language/language.component'
import { PageSizeFilterComponent } from './filters/pagesize/pagesize.component'
import { RentFilterComponent } from './filters/rent/rent.component'
import { SeriesFilterComponent } from './filters/series/series.component'
import { TextFilterComponent } from './filters/text/text.component'
import { GraphQLModule } from './graphql.module'
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

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        GenreFilterComponent,
        LanguageFilterComponent,
        MultiSelectComponent,
        PageSizeFilterComponent,
        RentFilterComponent,
        SearchComponent,
        SelectComponent,
        SeriesFilterComponent,
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
    ],
})
export class AppModule {}
