import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'docker' },
  { path: '**', redirectTo: '' },
  {
    path: 'docker',
    loadChildren: () => import('./docker.routes').then((r) => r.dockerRoutes),
  },
  {
    path: 'gus',
    loadChildren: () => import('./gus.routes').then((r) => r.gusRoutes),
  },
  {
    path: ':partner',
    loadChildren: () => import('./docker.routes').then((r) => r.dockerRoutes),
  },
  { path: ':partner', redirectTo: ':partner/inicio', pathMatch: 'full' },
];
