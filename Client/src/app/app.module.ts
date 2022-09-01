import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { LanguageFilterComponent } from './filters/language/language.component'
import { GraphQLModule } from './graphql.module'
import { ConfigService } from './services/config/config.service'
import { ContainerService } from './services/containers/container.service'
import { ErrorService } from './services/error/error.service'
import { GenreService } from './services/genre/genre.service'
import { LanguageService } from './services/languages/language.service'
import { RecordingService } from './services/recordings/recording.service'
import { SeriesService } from './services/series/series.service'

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, LanguageFilterComponent],
    imports: [BrowserModule, AppRoutingModule, GraphQLModule, HttpClientModule],
    providers: [
        ConfigService,
        ContainerService,
        ErrorService,
        GenreService,
        LanguageService,
        RecordingService,
        SeriesService,
    ],
})
export class AppModule {}
