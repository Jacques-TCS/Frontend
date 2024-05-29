import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaDeOcorrencia } from 'src/app/shared/model/categoriaDeOcorrencia';
import { Ocorrencia } from 'src/app/shared/model/ocorrencia';
import { OcorrenciaSeletor } from 'src/app/shared/model/seletor/ocorrencia.seletor';
import { StatusOcorrencia } from 'src/app/shared/model/status-ocorrencia';
import { CategoriaDeOcorrenciaService } from 'src/app/shared/service/categoriaDeOcorrencia.service';
import { OcorrenciaService } from 'src/app/shared/service/ocorrencia.service';
import { StatusOcorrenciaService } from 'src/app/shared/service/statusOcorrencia.service';
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
  public categorias: CategoriaDeOcorrencia[];
  public status: StatusOcorrencia[];
  public totalPaginas: number = 0;
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
    private ocorrenciaService: OcorrenciaService,
    private router: Router,
    private categoriaDeOcorrenciaService: CategoriaDeOcorrenciaService,
    private statusOcorrenciaService: StatusOcorrenciaService
  ) {}

  ngOnInit(): void {
    //  this.seletor.limite = this.TAMANHO_PAGINA;
    //  this.seletor.pagina = 0;
    // this.contarPaginas();
    this.filtrarOcorrencia();

    this.categoriaDeOcorrenciaService.listarTodos().subscribe(
      (resultado) => {
        this.categorias = resultado.map((categoria) => categoria);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar categorias', 'error');
      }
    );
    this.statusOcorrenciaService.listarTodos().subscribe(
      (resultado) => {
        this.status = resultado.map((status) => status);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar status', 'error');
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
    return Array(this.totalPaginas)
      .fill(0)
      .map((x, i) => i + 1);
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

  editar(id: number) {
    this.router.navigate(['/ocorrencias/edicao', id]);
  }

  fileName = 'ExcleSheet.xlsx';
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
