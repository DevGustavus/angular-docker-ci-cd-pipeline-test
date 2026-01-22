import { Injectable, signal } from '@angular/core';

export interface PartnerContextState {
  partner: string | null;
  initialized: boolean;
}

/**
 * Contexto que mantém o estado do parceiro em um signal privado
 * Acesso controlado através de getters e setters
 */
@Injectable({
  providedIn: 'root',
})
export class PartnerContext {
  // Signal privado - apenas acessível dentro desta classe
  private readonly _state = signal<PartnerContextState>({
    partner: null,
    initialized: false,
  });

  /**
   * Retorna o parceiro atual
   */
  getPartner(): string | null {
    return this._state().partner;
  }

  /**
   * Verifica se o contexto foi inicializado
   */
  isInitialized(): boolean {
    return this._state().initialized;
  }

  /**
   * Retorna o estado completo (somente leitura)
   */
  getState(): Readonly<PartnerContextState> {
    return this._state();
  }

  /**
   * Define o parceiro no estado
   */
  setPartner(partner: string): void {
    this._state.update((state) => ({
      ...state,
      partner,
      initialized: true,
    }));
  }

  /**
   * Limpa o estado do contexto
   */
  clear(): void {
    this._state.set({
      partner: null,
      initialized: false,
    });
  }

  /**
   * Atualiza apenas o flag de inicialização
   */
  markAsInitialized(): void {
    this._state.update((state) => ({
      ...state,
      initialized: true,
    }));
  }
}
