import { Injectable, inject, computed } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { PartnerContext } from '../context/partner.context';

/**
 * Serviço que gerencia a lógica de negócio relacionada ao parceiro
 * Utiliza o PartnerContext para acessar e modificar o estado
 */
@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  private readonly context = inject(PartnerContext);
  private readonly router = inject(Router);

  // Signals computados públicos para uso reativo
  readonly partner = computed(() => this.context.getPartner());
  readonly initialized = computed(() => this.context.isInitialized());

  /**
   * Captura o parceiro da URL atual e armazena no contexto
   * @param route ActivatedRouteSnapshot da rota atual (opcional)
   * @returns O parceiro capturado ou null
   */
  capturePartner(route?: ActivatedRouteSnapshot): string | null {
    // Se já foi inicializado, não captura novamente
    if (this.context.isInitialized()) {
      return this.context.getPartner();
    }

    let partner: string | null = null;

    // Tenta capturar do parâmetro da rota
    if (route) {
      partner = route.paramMap.get('partner');
    }

    // Se não encontrou no parâmetro, tenta capturar dos segmentos da URL
    if (!partner) {
      const urlSegments = this.router.url
        .split('/')
        .filter((segment) => segment && !segment.includes('?'));

      // Verifica se o primeiro segmento é uma rota conhecida (docker, gus)
      const knownRoutes = ['docker', 'gus'];

      if (urlSegments.length >= 2 && !knownRoutes.includes(urlSegments[0])) {
        // Se temos 2+ segmentos e o primeiro não é conhecido, é /:module/:partner
        partner = urlSegments[1];
      } else if (urlSegments.length >= 1) {
        // Caso contrário, o parceiro é o primeiro segmento
        partner = urlSegments[0];
      }
    }

    // Se encontrou um parceiro, armazena no contexto
    if (partner) {
      this.context.setPartner(partner);
    } else {
      // Marca como inicializado mesmo sem parceiro
      this.context.markAsInitialized();
    }

    return partner;
  }

  /**
   * Retorna o parceiro atual
   */
  getPartner(): string | null {
    return this.context.getPartner();
  }

  /**
   * Define manualmente o parceiro
   */
  setPartner(partner: string): void {
    this.context.setPartner(partner);
  }

  /**
   * Verifica se um parceiro específico está ativo
   * @param partnerName Nome do parceiro para verificar
   */
  isPartner(partnerName: string): boolean {
    const currentPartner = this.context.getPartner();
    return currentPartner?.toLowerCase() === partnerName.toLowerCase();
  }

  /**
   * Limpa o contexto do parceiro
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
