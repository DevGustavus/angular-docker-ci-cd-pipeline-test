import { Injectable, inject, computed } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { ModuleContext } from '../context/module.context';

/**
 * Serviço que gerencia a lógica de negócio relacionada ao módulo
 * Utiliza o ModuleContext para acessar e modificar o estado
 */
@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  private readonly context = inject(ModuleContext);
  private readonly router = inject(Router);

  // Signals computados públicos para uso reativo
  readonly module = computed(() => this.context.getModule());
  readonly initialized = computed(() => this.context.isInitialized());

  /**
   * Captura o módulo da URL atual e armazena no contexto
   * @param route ActivatedRouteSnapshot da rota atual (opcional)
   * @returns O módulo capturado ou null
   */
  captureModule(route?: ActivatedRouteSnapshot): string | null {
    // Se já foi inicializado, não captura novamente
    if (this.context.isInitialized()) {
      return this.context.getModule();
    }

    let module: string | null = null;

    // Tenta capturar do parâmetro da rota
    if (route) {
      module = route.paramMap.get('module');
    }

    // Se não encontrou no parâmetro, tenta capturar do primeiro segmento da URL
    if (!module) {
      const urlSegments = this.router.url
        .split('/')
        .filter((segment) => segment && !segment.includes('?'));

      // Verifica se o primeiro segmento é uma rota conhecida
      const knownRoutes = ['docker', 'gus'];

      // Se o primeiro segmento não é uma rota conhecida, pode ser um módulo
      if (urlSegments.length >= 2 && !knownRoutes.includes(urlSegments[0])) {
        module = urlSegments[0];
      }
    }

    // Armazena no contexto (pode ser null se não houver módulo)
    this.context.setModule(module);

    return module;
  }

  /**
   * Retorna o módulo atual
   */
  getModule(): string | null {
    return this.context.getModule();
  }

  /**
   * Define manualmente o módulo
   */
  setModule(module: string | null): void {
    this.context.setModule(module);
  }

  /**
   * Verifica se um módulo específico está ativo
   * @param moduleName Nome do módulo para verificar
   */
  isModule(moduleName: string): boolean {
    const currentModule = this.context.getModule();
    return currentModule?.toLowerCase() === moduleName.toLowerCase();
  }

  /**
   * Verifica se o módulo atual é "atendimento"
   */
  isAtendimento(): boolean {
    return this.isModule('atendimento');
  }

  /**
   * Limpa o contexto do módulo
   */
  clearContext(): void {
    this.context.clear();
  }

  /**
   * Retorna o estado completo do contexto
   */
  getContextState() {
    return this.context.getState();
  }
}
