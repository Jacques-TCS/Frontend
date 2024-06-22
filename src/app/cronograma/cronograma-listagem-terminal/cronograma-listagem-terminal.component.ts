import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Ambiente } from 'src/app/shared/model/ambiente';
import { Atividade } from 'src/app/shared/model/atividade';
import { Cronograma } from 'src/app/shared/model/cronograma';
import { CronogramaSeletor } from 'src/app/shared/model/seletor/cronograma.seletor';
import { Setor } from 'src/app/shared/model/setor';
import { CronogramaService } from 'src/app/shared/service/cronograma.service';

@Component({
  selector: 'app-cronograma-listagem-terminal',
  templateUrl: './cronograma-listagem-terminal.component.html',
  styleUrls: ['./cronograma-listagem-terminal.component.scss']
})
export class CronogramaListagemTerminalComponent implements OnInit {
  public cronogramas: Array<Cronograma> = new Array();
  public seletor: CronogramaSeletor = new CronogramaSeletor();
  public atividades: Atividade[];

  

  public totalPaginas: number = 0;
  public readonly TAMANHO_PAGINA: number = 10;

  public mostrar: boolean;
  public esconder: boolean;

  public mostrarFiltros() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }

  public mostrarCronogramas: boolean;
  public esconderCronogramas: boolean;

  public mostrarListagemDeCronogramas() {
    this.mostrarCronogramas = !this.mostrarCronogramas;
    this.esconderCronogramas = !this.esconderCronogramas;
  }

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private cronogramaService: CronogramaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 0;
    this.contarPaginas();
    this.filtrarCronograma();
  }

  public contarPaginas() {
    this.cronogramaService.contarPaginas(this.seletor).subscribe(
      (resultado) => {
        this.totalPaginas = resultado;
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

  criarArrayPaginas(): any[] {
    return Array(this.totalPaginas)
      .fill(0)
      .map((x, i) => i + 1);
  }

  buscarTodos() {
    this.cronogramaService.listarTodos().subscribe(
      (resultado) => {
        this.cronogramas = resultado;
      },
      (erro) => {
        console.log('Erro ao buscar cronogramas', erro);
      }
    );
  }

  public filtrarCronograma() {
    this.cronogramaService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.cronogramas = resultado;
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

  atualizarPaginacao() {
    this.contarPaginas();
    this.irParaPagina(0);
    this.filtrarCronograma();
  }

  avancarPagina() {
    this.seletor.pagina++;
    this.filtrarCronograma();
  }

  voltarPagina() {
    this.seletor.pagina--;
    this.filtrarCronograma();
  }

  irParaPagina(indicePagina: number) {
    this.seletor.pagina = indicePagina;
    this.filtrarCronograma();
  }

  //TODO Método para atribuir funcionário ao cronograma por meio da edição de um cronograma
  // public atribuirFuncionario(idFuncionario: number) {
  //   this.router.navigate(['/cronograma/editar', idFuncionario]);
  // }
}