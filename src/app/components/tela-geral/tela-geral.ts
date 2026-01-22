import { Component, OnInit, signal } from '@angular/core';
import { IsLoadingDirective } from '../../shared/directives/is-loading.directive';

@Component({
  selector: 'app-tela-geral',
  imports: [IsLoadingDirective],
  templateUrl: './tela-geral.html',
  styleUrl: './tela-geral.scss',
})
export class TelaGeral implements OnInit {
  protected isLoading = signal(true);

  ngOnInit(): void {
    // Simula um carregamento
    setTimeout(() => {
      this.isLoading.set(false);
    }, 3000);
  }
}
