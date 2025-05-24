import { Routes } from '@angular/router';

import { ContainerRouteComponent } from './container.component';

export const containerRoutes: Routes = [
  {
    component: ContainerRouteComponent,
    path: '',
    pathMatch: 'full',
  },
  {
    component: ContainerRouteComponent,
    path: ':id',
  },
];
