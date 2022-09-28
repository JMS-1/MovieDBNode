import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    /** Startseite. */
    {
        loadChildren: () => import('./routes/recordings/recordings.module').then((m) => m.RecordingsModule),
        path: '',
        pathMatch: 'full',
    },
    /** Standardrouten. */
    {
        loadChildren: () => import('./routes/recording/recording.module').then((m) => m.RecordingModule),
        path: 'recordings',
    },
    {
        loadChildren: () => import('./routes/series/series.module').then((m) => m.SeriesModule),
        path: 'series',
    },
    {
        loadChildren: () => import('./routes/container/container.module').then((m) => m.ContainerModule),
        path: 'containers',
    },
    {
        loadChildren: () => import('./routes/language/language.module').then((m) => m.LanguageModule),
        path: 'languages',
    },
    {
        loadChildren: () => import('./routes/genre/genre.module').then((m) => m.GenreModule),
        path: 'genres',
    },
    /** Fallbackrouten. */
    { loadChildren: () => import('./routes/recordings/recordings.module').then((m) => m.RecordingsModule), path: '**' },
]

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes, { useHash: true })],
})
export class AppRoutingModule {}
