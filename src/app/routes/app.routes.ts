import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'docker' },

  // Rotas diretas (cada parceiro tem suas próprias rotas)
  {
    path: 'docker',
    loadChildren: () => import('./docker.routes').then((r) => r.dockerRoutes),
  },
  {
    path: 'gus',
    loadChildren: () => import('./gus.routes').then((r) => r.gusRoutes),
  },

  // Rotas dinâmicas com módulo para parceiros conhecidos
  // Ex: /atendimento/docker/inicio, /vendas/gus/inicio
  {
    path: ':module/docker',
    loadChildren: () => import('./docker.routes').then((r) => r.dockerRoutes),
  },
  {
    path: ':module/gus',
    loadChildren: () => import('./gus.routes').then((r) => r.gusRoutes),
  },

  // Rota dinâmica com módulo E parceiro desconhecidos: /:module/:partner
  // Ex: /atendimento/microsoft/inicio, /vendas/oracle/inicio
  // Usa dockerRoutes como template padrão para parceiros desconhecidos
  {
    path: ':module/:partner',
    loadChildren: () => import('./docker.routes').then((r) => r.dockerRoutes),
  },

  // Rota dinâmica apenas com parceiro (sem módulo)
  // Ex: /microsoft/inicio, /oracle/inicio
  {
    path: ':partner',
    loadChildren: () => import('./docker.routes').then((r) => r.dockerRoutes),
  },

  { path: '**', redirectTo: 'docker' },
];
