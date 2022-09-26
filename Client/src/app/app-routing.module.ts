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
    imports: [RouterModule.forRoot(routes, { useHash: true })],
})
export class AppRoutingModule {}
