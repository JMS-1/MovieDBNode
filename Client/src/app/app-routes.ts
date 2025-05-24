import { Routes } from '@angular/router';

export const routes: Routes = [
  /** Startseite. */
  {
    loadChildren: () =>
      import('./routes/recordings/recordings-routing').then(
        (m) => m.recordingsRoutes,
      ),
    path: '',
    pathMatch: 'full',
  },
  /** Standardrouten. */
  {
    loadChildren: () =>
      import('./routes/recording/recording-routing').then(
        (m) => m.recordingRoutes,
      ),
    path: 'recordings',
  },
  {
    loadChildren: () =>
      import('./routes/series/series-routing').then((m) => m.seriesRoutes),
    path: 'series',
  },
  {
    loadChildren: () =>
      import('./routes/container/container-routing').then(
        (m) => m.containerRoutes,
      ),
    path: 'containers',
  },
  {
    loadChildren: () =>
      import('./routes/language/language-routing').then(
        (m) => m.languageRoutes,
      ),
    path: 'languages',
  },
  {
    loadChildren: () =>
      import('./routes/genre/genre-routing').then((m) => m.genreRoutes),
    path: 'genres',
  },
  /** Fallbackrouten. */
  {
    loadChildren: () =>
      import('./routes/recordings/recordings-routing').then(
        (m) => m.recordingsRoutes,
      ),
    path: '**',
  },
];
