import { Routes } from '@angular/router';

export const gusRoutes: Routes = [
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
  // Página exclusiva do Gus
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
];
