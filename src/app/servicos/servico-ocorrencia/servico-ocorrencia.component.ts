import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/shared/model/categoria';
import { Ocorrencia } from 'src/app/shared/model/ocorrencia';
import { OcorrenciaSeletor } from 'src/app/shared/model/seletor/ocorrencia.seletor';
import { CategoriaService } from 'src/app/shared/service/categoria.service';
import { OcorrenciaService } from 'src/app/shared/service/ocorrencia.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-servico-ocorrencia',
  templateUrl: './servico-ocorrencia.component.html',
  styleUrls: ['./servico-ocorrencia.component.scss'],
})
export class ServicoOcorrenciaComponent implements OnInit {
  public ocorrencias: Array<Ocorrencia> = new Array();
  public seletor: OcorrenciaSeletor = new OcorrenciaSeletor();
  public categorias: Categoria[];
  public status: { valor: boolean, texto: string }[] = [
    { valor: false, texto: 'Em andamento' },
    { valor: true, texto: 'Concluída' }
  ];
  public totalPaginas: number = 0;
  public readonly TAMANHO_PAGINA: number = 25;

  public mostrar: boolean;
  public esconder: boolean;

  public mostrarFiltros() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private ocorrenciaService: OcorrenciaService,
    private categoriaService: CategoriaService,
  ) { }

  ngOnInit(): void {
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 0;
    this.contarPaginas();
    this.filtrarOcorrencia();

    this.categoriaService.listarTodos().subscribe(
      (resultado) => {
        this.categorias = resultado.map((categoria) => categoria);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar categorias', 'error');
      }
    );
  }

  public contarPaginas() {
    this.ocorrenciaService.contarPaginas(this.seletor).subscribe(
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

  buscarTodos() {
    this.ocorrenciaService.listarTodos().subscribe(
      (resultado) => {
        this.ocorrencias = resultado;
      },
      (erro) => {
        console.log('Erro ao buscar ocorrencias', erro);
      }
    );
  }

  filtrarOcorrencia() {
    this.ocorrenciaService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.ocorrencias = resultado;
      },
      (erro) => {
        console.log('Erro ao buscar ocorrencias', erro);
      }
    );
  }

  editar(id: Ocorrencia) {
    Swal.fire({
      title: 'Tem certeza de que deseja alterar o status da ocorrência?',
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: `Sim`,
      confirmButtonColor: "#3085d6",
      denyButtonText: `Não`,
      denyButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        this.alterarStatus(id);
        icon: "success";
      }
    })
  }

  alterarStatus(ocorrencia: Ocorrencia) {
    ocorrencia.status = !ocorrencia.status;
    this.ocorrenciaService.atualizar(ocorrencia).subscribe(
      () => {
        console.log('Status alterado com sucesso');
      },
      (erro) => {
        console.log('Erro ao alterar status', erro);
      }
    );
  }

  fileName = 'ListagemDeOcorrencia.xlsx';
  exportarPlanilhaOcorrencia() {
    let data = document.getElementById('tabela-ocorrencia');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Planilha');

    XLSX.writeFile(wb, this.fileName);
  }

  atualizarPaginacao() {
    this.contarPaginas();
    this.irParaPagina(0);
    this.filtrarOcorrencia();
  }

  avancarPagina() {
    this.seletor.pagina++;
    this.filtrarOcorrencia();
  }

  voltarPagina() {
    this.seletor.pagina--;
    this.filtrarOcorrencia();
  }

  irParaPagina(indicePagina: number) {
    this.seletor.pagina = indicePagina;
    this.filtrarOcorrencia();
  }
}
