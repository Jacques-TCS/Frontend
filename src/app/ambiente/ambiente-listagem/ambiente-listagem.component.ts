import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Ambiente } from 'src/app/shared/model/ambiente';
import { Atividade } from 'src/app/shared/model/atividade';
import { AmbienteSeletor } from 'src/app/shared/model/seletor/ambiente.seletor';
import { AtividadeSeletor } from 'src/app/shared/model/seletor/atividade.seletor';
import { Setor } from 'src/app/shared/model/setor';
import { AmbienteService } from 'src/app/shared/service/ambiente.service';
import { AtividadeService } from 'src/app/shared/service/atividade.service';
import { SetorService } from 'src/app/shared/service/setor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ambiente-listagem',
  templateUrl: './ambiente-listagem.component.html',
  styleUrls: ['./ambiente-listagem.component.scss'],
})
export class AmbienteListagemComponent implements OnInit {
  @Output() editarAmbiente = new EventEmitter<number>();
  public ambientes: Array<Ambiente> = new Array();
  public seletor: AmbienteSeletor = new AmbienteSeletor();
  public setores: Array<Setor> = new Array();
  public atividades: Atividade[] = [];
  public totalPaginas: number = 0;
  public readonly TAMANHO_PAGINA: number = 25;
  public atividadeSeletor: AtividadeSeletor = new AtividadeSeletor();

  public mostrar: boolean;
  public esconder: boolean;

  public mostrarFiltros() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }

  public mostrarAmbientes: boolean;
  public esconderAmbientes: boolean;

  public mostrarListagemDeAmbientes() {
    this.mostrarAmbientes = !this.mostrarAmbientes;
    this.esconderAmbientes = !this.esconderAmbientes;
  }

  @Output() refreshListagem = new EventEmitter<void>();
  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private ambienteService: AmbienteService,
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
    this.filtrarAmbiente();

    this.atividadeService.listarComSeletor(this.atividadeSeletor).subscribe(
      (resultado) => {
        this.atividades = resultado.filter((atividade) => atividade.status === true);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar atividades', 'error');
      }
    );

    this.setorService.listarTodos().subscribe(
      (resultado) => {
        this.setores = resultado.map((setor) => setor);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar setores', 'error');
      }
    );
  }

  public contarPaginas() {
    this.ambienteService.contarPaginas(this.seletor).subscribe(
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

  filtrarAmbiente() {
    this.ambienteService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.ambientes = resultado;
        this.refreshListagem.emit();
      },
      (erro) => {
        console.log('Erro ao buscar ambientes', erro);
      }
    );
  }

  editar(id: number) {
    this.editarAmbiente.emit(id);
  }

  atualizarPaginacao() {
    this.contarPaginas();
    this.irParaPagina(0);
    this.filtrarAmbiente();
  }

  avancarPagina() {
    this.seletor.pagina++;
    this.filtrarAmbiente();
  }

  voltarPagina() {
    this.seletor.pagina--;
    this.filtrarAmbiente();
  }

  irParaPagina(indicePagina: number) {
    this.seletor.pagina = indicePagina;
    this.filtrarAmbiente();
  }

  qrcode(id: number) {
    const url = '/ambiente/listagem/qrcode/' + id;
    const windowFeatures = 'width=800,height=600,toolbar=no,scrollbars=no,resizable=yes';
    window.open(url, '_blank', windowFeatures);
  }
}
