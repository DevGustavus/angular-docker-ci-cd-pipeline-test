import { Component } from '@angular/core';
import { TelaGeral } from "../../components/tela-geral/tela-geral";
import { Header } from "../../components/header/header";

@Component({
  selector: 'app-inicio',
  imports: [TelaGeral, Header],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss'
})
export class Inicio {

}
