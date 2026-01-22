import { Routes } from '@angular/router';

export const dockerRoutes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () => import('../pages/inicio/inicio').then((m) => m.Inicio),
  },
  {
    path: 'sobre',
    loadComponent: () => import('../pages/sobre/sobre').then((m) => m.Sobre),
  },
  // Página exclusiva do Docker
  {
    path: 'containers',
    loadComponent: () =>
      import('../pages/containers/containers').then((m) => m.Containers),
  },
];
