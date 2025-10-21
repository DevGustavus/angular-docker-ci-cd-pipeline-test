import { Routes } from '@angular/router';

export const dockerRoutes: Routes = [
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
