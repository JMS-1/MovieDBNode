import { enableProdMode, provideZoneChangeDetection } from '@angular/core';

import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { RootComponent } from './app/root/root.component';
import { ConfigService } from './app/services/config/config.service';
import { ContainerService } from './app/services/containers/container.service';
import { GenreService } from './app/services/genre/genre.service';
import { GraphQLService } from './app/services/graphql/graphql.service';
import { LanguageService } from './app/services/languages/language.service';
import { RecordingService } from './app/services/recordings/recording.service';
import { RecordingsService } from './app/services/recordings/recordings.service';
import { SeriesService } from './app/services/series/series.service';
import { ThemeService } from './app/services/themes/theme.service';
import { ValidationService } from './app/services/validation/validation.service';
import * as http from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(RootComponent, {
  providers: [
    provideZoneChangeDetection(),ConfigService,
    ContainerService,
    GenreService,
    GraphQLService,
    LanguageService,
    RecordingService,
    RecordingsService,
    SeriesService,
    ThemeService,
    ValidationService,
    http.provideHttpClient(http.withInterceptorsFromDi()),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
