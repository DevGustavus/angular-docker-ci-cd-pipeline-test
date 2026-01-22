import { Component, inject } from '@angular/core';
import { TelaGeral } from '../../components/tela-geral/tela-geral';
import { Header } from '../../components/header/header';
import { PartnerService } from '../../core/services/partner.service';
import { ModuleService } from '../../core/services/module.service';

@Component({
  selector: 'app-inicio',
  imports: [TelaGeral, Header],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
  private readonly partnerService = inject(PartnerService);
  private readonly moduleService = inject(ModuleService);

  ngOnInit() {
    this.moduleService.captureModule();
    this.partnerService.capturePartner();

    console.log('[Inicio] Módulo capturado:', this.moduleService.getModule());
    console.log(
      '[Inicio] Parceiro capturado:',
      this.partnerService.getPartner(),
    );
    console.log('[Inicio] É atendimento?', this.moduleService.isAtendimento());
  }
}
