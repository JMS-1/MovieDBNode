import { Routes } from '@angular/router';

import { SeriesRouteComponent } from './series.component';

export const seriesRoutes: Routes = [
  {
    component: SeriesRouteComponent,
    path: '',
    pathMatch: 'full',
  },
  {
    component: SeriesRouteComponent,
    path: ':id',
  },
];
