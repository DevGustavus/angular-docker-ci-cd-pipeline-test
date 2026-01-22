import { Injectable, signal } from '@angular/core';

export interface ModuleContextState {
  module: string | null;
  initialized: boolean;
}

/**
 * Contexto que mantém o estado do módulo em um signal privado
 * Acesso controlado através de getters e setters
 */
@Injectable({
  providedIn: 'root',
})
export class ModuleContext {
  // Signal privado - apenas acessível dentro desta classe
  private readonly _state = signal<ModuleContextState>({
    module: null,
    initialized: false,
  });

  /**
   * Retorna o módulo atual
   */
  getModule(): string | null {
    return this._state().module;
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
  getState(): Readonly<ModuleContextState> {
    return this._state();
  }

  /**
   * Define o módulo no estado
   */
  setModule(module: string | null): void {
    this._state.update((state) => ({
      ...state,
      module,
      initialized: true,
    }));
  }

  /**
   * Limpa o estado do contexto
   */
  clear(): void {
    this._state.set({
      module: null,
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
