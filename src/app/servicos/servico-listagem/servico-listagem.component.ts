import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Atividade } from 'src/app/shared/model/atividade';
import { CategoriaDeOcorrencia } from 'src/app/shared/model/categoriaDeOcorrencia';
import { ServicoSeletor } from 'src/app/shared/model/seletor/servico.seletor';
import { Servico } from 'src/app/shared/model/servico';
import { StatusUsuario } from 'src/app/shared/model/status-usuario';
import { AtividadeService } from 'src/app/shared/service/atividade.service';
import { CategoriaDeOcorrenciaService } from 'src/app/shared/service/categoria-ocorrencia.service';
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
  public categoriaOcorrencias: CategoriaDeOcorrencia[]
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
    private categoriaOcorrenciaService: CategoriaDeOcorrenciaService,
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
    return Array(this.totalPaginas).fill(0).map((x, i) => i + 1);
  }

  filtrarServico() {
    this.servicoService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.servicos = resultado;
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
