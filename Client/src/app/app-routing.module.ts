import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ContainerRouteComponent } from './routes/container/container.component'
import { ContainerModule } from './routes/container/container.module'
import { GenreRouteComponent } from './routes/genre/genre.component'
import { GenreModule } from './routes/genre/genre.module'
import { LanguageRouteComponent } from './routes/language/language.component'
import { LanguageModule } from './routes/language/language.module'
import { RecordingRouteComponent } from './routes/recording/recording.component'
import { RecordingModule } from './routes/recording/recording.module'
import { RecordingsRouteComponent } from './routes/recordings/recordings.component'
import { RecordingsModule } from './routes/recordings/recordings.module'
import { SeriesRouteComponent } from './routes/series/series.component'
import { SeriesModule } from './routes/series/series.module'

const routes: Routes = [
    /** Startseite. */
    { component: RecordingsRouteComponent, path: '', pathMatch: 'full' },
    /** Standardrouten. */
    { component: RecordingRouteComponent, path: 'recordings/:id' },
    { component: SeriesRouteComponent, path: 'series', pathMatch: 'full' },
    { component: SeriesRouteComponent, path: 'series/:id' },
    { component: ContainerRouteComponent, path: 'containers', pathMatch: 'full' },
    { component: ContainerRouteComponent, path: 'containers/:id' },
    { component: LanguageRouteComponent, path: 'languages', pathMatch: 'full' },
    { component: LanguageRouteComponent, path: 'languages/:id' },
    { component: GenreRouteComponent, path: 'genres', pathMatch: 'full' },
    { component: GenreRouteComponent, path: 'genres/:id' },
    /** Fallbackrouten. */
    { component: RecordingsRouteComponent, path: '**' },
]

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
        GenreModule,
        LanguageModule,
        SeriesModule,
        ContainerModule,
        RecordingModule,
        RecordingsModule,
    ],
})
export class AppRoutingModule {}
