import { Routes } from '@angular/router';

import { RecordingRouteComponent } from './recording.component';

export const recordingRoutes: Routes = [
  {
    component: RecordingRouteComponent,
    path: ':id/:reload',
  },
];
