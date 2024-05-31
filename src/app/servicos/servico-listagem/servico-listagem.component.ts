import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { Cargo } from 'src/app/shared/model/cargo';
import { StatusUsuario } from 'src/app/shared/model/status-usuario';
import { CargoService } from 'src/app/shared/service/cargo.service';
import { StatusUsuarioService } from 'src/app/shared/service/statusUsuario.service';
import { Servico } from 'src/app/shared/model/servico';
import { ServicoService } from 'src/app/shared/service/servico.service';
import { ServicoSeletor } from 'src/app/shared/model/seletor/servico.seletor';
import { Atividade } from 'src/app/shared/model/atividade';
import { Ocorrencia } from 'src/app/shared/model/ocorrencia';

@Component({
  selector: 'app-servico-listagem',
  templateUrl: './servico-listagem.component.html',
  styleUrls: ['./servico-listagem.component.scss']
})
export class ServicoListagemComponent implements OnInit {
  public servicos: Array<Servico> = new Array();
  public seletor: ServicoSeletor = new ServicoSeletor();
  public atividades: Atividade[];
  public statusOcorrencia: { valor: boolean, texto: string }[] = [
    { valor: false, texto: 'Em andamento' },
    { valor: true, texto: 'Concluída' }
  ];
  public cargos: Cargo[];
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
    private router: Router,
    private route: ActivatedRoute,
    private cargoService: CargoService,
    private statusUsuarioService: StatusUsuarioService
  ) { }

  ngOnInit(): void {
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 0;
    this.filtrarServico();
    this.contarPaginas();
    this.cargoService.listarTodos().subscribe(
      (resultado) => {
        this.cargos = resultado.map((cargo) => cargo);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar cargos', 'error');
      }
    );
    this.statusUsuarioService.listarTodos().subscribe(
      (resultado) => {
        this.status = resultado.map((status) => status);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar status', 'error');
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
