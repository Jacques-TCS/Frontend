import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Atividade } from 'src/app/shared/model/atividade';
import { Cronograma } from 'src/app/shared/model/cronograma';
import { CronogramaSeletor } from 'src/app/shared/model/seletor/cronograma.seletor';
import { Servico } from 'src/app/shared/model/servico';
import { CronogramaService } from 'src/app/shared/service/cronograma.service';

@Component({
  selector: 'app-cronograma-listagem-terminal',
  templateUrl: './cronograma-listagem-terminal.component.html',
  styleUrls: ['./cronograma-listagem-terminal.component.scss']
})
export class CronogramaListagemTerminalComponent implements OnInit {
  public cronogramas: Array<Cronograma> = new Array();
  public seletor: CronogramaSeletor = new CronogramaSeletor();
  public servicos: Array<Servico> = new Array();
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
    const totalPages = this.totalPaginas;
    const currentPage = this.seletor.pagina + 1;
    const maxPagesToShow = 4;
    const pages = [];
    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
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
