import { Component, OnInit, ViewChild } from '@angular/core';
import { CronogramaListagemConcorrenteComponent } from '../cronograma-listagem-concorrente/cronograma-listagem-concorrente.component';
import { CronogramaListagemTerminalComponent } from '../cronograma-listagem-terminal/cronograma-listagem-terminal.component';

@Component({
  selector: 'app-cronograma-home',
  templateUrl: './cronograma-home.component.html',
  styleUrls: ['./cronograma-home.component.scss']
})
export class CronogramaHomeComponent {
  @ViewChild('listagemConcorrente') listagemConcorrente: CronogramaListagemConcorrenteComponent;
  @ViewChild('listagemTerminal') listagemTerminal: CronogramaListagemTerminalComponent;
  public mostrar: boolean = true;

  public mostrarCadastro() {
    this.mostrar = !this.mostrar;
  }

  refreshListagemConcorrente() {
    this.listagemConcorrente.filtrarCronograma();
  }

  refreshListagemTerminal() {
    this.listagemTerminal.filtrarCronograma();
  }
}
