import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ContainerRouteComponent } from './routes/container/container.component'
import { GenreRouteComponent } from './routes/genre/genre.component'
import { LanguageRouteComponent } from './routes/language/language.component'
import { RecordingRouteComponent } from './routes/recording/recording.component'
import { RecordingsRouteComponent } from './routes/recordings/recordings.component'
import { SeriesRouteComponent } from './routes/series/series.component'

const routes: Routes = [
    /** Startseite. */
    { component: RecordingsRouteComponent, path: '', pathMatch: 'full' },
    /** Standardrouten. */
    { component: RecordingRouteComponent, path: 'recording/:id' },
    { component: SeriesRouteComponent, path: 'series', pathMatch: 'full' },
    { component: SeriesRouteComponent, path: 'series/:id' },
    { component: ContainerRouteComponent, path: 'container', pathMatch: 'full' },
    { component: ContainerRouteComponent, path: 'container/:id' },
    { component: LanguageRouteComponent, path: 'language', pathMatch: 'full' },
    { component: LanguageRouteComponent, path: 'language/:id' },
    { component: GenreRouteComponent, path: 'genre', pathMatch: 'full' },
    { component: GenreRouteComponent, path: 'genre/:id' },
    /** Fallbackrouten. */
    { component: RecordingsRouteComponent, path: '**' },
]

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes, { useHash: true })],
})
export class AppRoutingModule {}
