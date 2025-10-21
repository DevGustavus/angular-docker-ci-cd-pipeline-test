import { Routes } from '@angular/router';

export const gusRoutes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('../pages/inicio/inicio').then(
        (m) => m.Inicio
      ),
  },
];
