import { Routes } from '@angular/router';

import { GenreRouteComponent } from './genre.component';

export const genreRoutes: Routes = [
  {
    component: GenreRouteComponent,
    path: '',
    pathMatch: 'full',
  },
  {
    component: GenreRouteComponent,
    path: ':id',
  },
];
