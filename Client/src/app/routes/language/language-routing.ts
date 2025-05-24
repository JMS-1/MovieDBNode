import { Routes } from '@angular/router';

import { LanguageRouteComponent } from './language.component';

export const languageRoutes: Routes = [
  {
    component: LanguageRouteComponent,
    path: '',
    pathMatch: 'full',
  },
  {
    component: LanguageRouteComponent,
    path: ':id',
  },
];
