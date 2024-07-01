import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Atividade } from 'src/app/shared/model/atividade';
import { AtividadeSeletor } from 'src/app/shared/model/seletor/atividade.seletor';
import { SetorSeletor } from 'src/app/shared/model/seletor/setor.seletor';
import { Setor } from 'src/app/shared/model/setor';
import { AtividadeService } from 'src/app/shared/service/atividade.service';
import { SetorService } from 'src/app/shared/service/setor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setor-listagem',
  templateUrl: './setor-listagem.component.html',
  styleUrls: ['./setor-listagem.component.scss']
})
export class SetorListagemComponent implements OnInit {
  @Output() editarSetor = new EventEmitter<number>();
  public setores: Array<Setor> = new Array();
  public seletor: SetorSeletor = new SetorSeletor();
  public atividadeSeletor: AtividadeSeletor = new AtividadeSeletor();
  public atividades: Atividade[];

  public totalPaginas: number = 0;
  public readonly TAMANHO_PAGINA: number = 25;

  public mostrar: boolean;
  public esconder: boolean;

  public mostrarFiltros() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }

  public mostrarSetores: boolean;
  public esconderSetores: boolean;

  public mostrarListagemDeSetores() {
    this.mostrarSetores = !this.mostrarSetores;
    this.esconderSetores = !this.esconderSetores;
  }

  @Output() refreshListagem = new EventEmitter<void>();
  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private setorService: SetorService,
    private atividadeService: AtividadeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 0;
    this.atividadeSeletor.limite = this.TAMANHO_PAGINA;
    this.atividadeSeletor.pagina = 0;
    this.contarPaginas();
    this.filtrarSetor();

    this.atividadeService.listarComSeletor(this.atividadeSeletor).subscribe(
      (resultado) => {
        this.atividades = resultado.filter((atividade) => atividade.status === true);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar atividades', 'error');
      }
    );
  }

  public contarPaginas() {
    this.setorService.contarPaginas(this.seletor).subscribe(
      (resultado) => {
        this.totalPaginas = resultado;
      },
      (erro) => {
        Swal.fire(
          'Erro ao consultar total de páginas',
          erro.error.mensagem,
          'error'
        );
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

  filtrarSetor() {
    this.setorService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.setores = resultado;
        this.refreshListagem.emit();
      },
      (erro) => {
        console.log('Erro ao buscar setores', erro);
      }
    );
  }

  editar(id: number) {
    this.editarSetor.emit(id);
  }

  atualizarPaginacao() {
    this.contarPaginas();
    this.irParaPagina(0);
    this.filtrarSetor();
  }

  avancarPagina() {
    this.seletor.pagina++;
    this.filtrarSetor();
  }

  voltarPagina() {
    this.seletor.pagina--;
    this.filtrarSetor();
  }

  irParaPagina(indicePagina: number) {
    this.seletor.pagina = indicePagina;
    this.filtrarSetor();
  }

}

