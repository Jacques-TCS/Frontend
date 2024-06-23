import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Atividade } from 'src/app/shared/model/atividade';
import { Categoria } from 'src/app/shared/model/categoria';
import { ServicoSeletor } from 'src/app/shared/model/seletor/servico.seletor';
import { Servico } from 'src/app/shared/model/servico';
import { StatusUsuario } from 'src/app/shared/model/status-usuario';
import { AtividadeService } from 'src/app/shared/service/atividade.service';
import { CategoriaService } from 'src/app/shared/service/categoria-ocorrencia.service';
import { OcorrenciaService } from 'src/app/shared/service/ocorrencia.service';
import { ServicoService } from 'src/app/shared/service/servico.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-servico-listagem',
  templateUrl: './servico-listagem.component.html',
  styleUrls: ['./servico-listagem.component.scss']
})
export class ServicoListagemComponent implements OnInit {
  public servicos: Array<Servico> = new Array();
  public seletor: ServicoSeletor = new ServicoSeletor();
  public atividades: Atividade[]
  public categoriaOcorrencias: Categoria[]
  public status: StatusUsuario[];
  public totalPaginas: number = 1;
  public readonly TAMANHO_PAGINA: number = 10;

  public mostrar: boolean;
  public esconder: boolean;

  public mostrarFiltros() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private servicoService: ServicoService,
    private atividadeService: AtividadeService,
    private categoriaOcorrenciaService: CategoriaService,
  ) {}

  ngOnInit(): void {
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 0;
    this.filtrarServico();
    this.contarPaginas();
    this.atividadeService.listarTodos().subscribe(
      (resultado) => {
        this.atividades = resultado.map((atividade) => atividade);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar atividades', 'error');
      }
    );
    this.categoriaOcorrenciaService.listarTodos().subscribe(
      (resultado) => {
        this.categoriaOcorrencias = resultado.map((categoriaOcorrencias) => categoriaOcorrencias);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar ocorrencias', 'error');
      }
    );
  }

  public contarPaginas() {
    this.servicoService.contarPaginas(this.seletor).subscribe(
      resultado => {
        this.totalPaginas = resultado;
      },
      erro => {
        Swal.fire('Erro ao consultar total de páginas', erro.error.mensagem, 'error');
      }
    );
  }

  criarArrayPaginas(): any[] {
    const totalPages = this.totalPaginas;
    const currentPage = this.seletor.pagina + 1;
    const maxPagesToShow = 9;

    if (totalPages <= maxPagesToShow) {
      return Array(totalPages).fill(0).map((x, i) => i + 1);
    }

    const pages = [];
    pages.push(1);
    pages.push(2);

    if (currentPage > 4) {
      pages.push('...');
    }

    let startPage = Math.max(3, currentPage - 1);
    let endPage = Math.min(totalPages - 2, currentPage + 1);

    if (currentPage <= 4) {
      endPage = 5;
    } else if (currentPage >= totalPages - 3) {
      startPage = totalPages - 5;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push('...');
    }

    pages.push(totalPages - 1);
    pages.push(totalPages);

    return pages;
  }


  filtrarServico() {
    this.servicoService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.servicos = resultado;
        this.contarPaginas();
        this.criarArrayPaginas();
      },
      (erro) => {
        console.log('Erro ao buscar serviços', erro);
      }
    );
  }

  fileName = 'ExcleSheet.xlsx';
  exportarPlanilhaServico() {
    let data = document.getElementById('tabela-usuarios');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Planilha');

    XLSX.writeFile(wb, this.fileName);
  }

  atualizarPaginacao() {
    this.contarPaginas();
    this.irParaPagina(0);
    this.filtrarServico();
  }

  avancarPagina() {
    this.seletor.pagina++;
    this.filtrarServico();
  }

  voltarPagina() {
    this.seletor.pagina--;
    this.filtrarServico();
  }

  irParaPagina(indicePagina: number) {
    this.seletor.pagina = indicePagina;
    this.filtrarServico();
  }
}
