import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { RootComponent } from './root/root.component'
import { SubMenuComponent } from './semantic/menu/menu.component'
import { ConfigService } from './services/config/config.service'
import { ContainerService } from './services/containers/container.service'
import { GenreService } from './services/genre/genre.service'
import { GraphQLService } from './services/graphql/graphql.service'
import { LanguageService } from './services/languages/language.service'
import { RecordingService } from './services/recordings/recording.service'
import { RecordingsService } from './services/recordings/recordings.service'
import { SeriesService } from './services/series/series.service'
import { ThemeService } from './services/themes/theme.service'
import { ValidationService } from './services/validation/validation.service'
import { SharedModule } from './shared.module'

@NgModule({ bootstrap: [RootComponent],
    declarations: [RootComponent, SubMenuComponent], imports: [AppRoutingModule, BrowserModule, FormsModule, SharedModule], providers: [
        ConfigService,
        ContainerService,
        GenreService,
        GraphQLService,
        LanguageService,
        RecordingService,
        RecordingsService,
        SeriesService,
        ThemeService,
        ValidationService,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
