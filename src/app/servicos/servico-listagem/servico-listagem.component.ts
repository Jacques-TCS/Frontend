import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Atividade } from 'src/app/shared/model/atividade';
import { Cargo } from 'src/app/shared/model/cargo';
import { Categoria } from 'src/app/shared/model/categoria';
import { ServicoSeletor } from 'src/app/shared/model/seletor/servico.seletor';
import { UsuarioSeletor } from 'src/app/shared/model/seletor/usuario.seletor';
import { Servico } from 'src/app/shared/model/servico';
import { StatusUsuario } from 'src/app/shared/model/status-usuario';
import { TipoDeLimpeza } from 'src/app/shared/model/tipoDeLimpeza';
import { Usuario } from 'src/app/shared/model/usuario';
import { AtividadeService } from 'src/app/shared/service/atividade.service';
import { CategoriaService } from 'src/app/shared/service/categoria.service';
import { OcorrenciaService } from 'src/app/shared/service/ocorrencia.service';
import { ServicoService } from 'src/app/shared/service/servico.service';
import { TipoDeLimpezaService } from 'src/app/shared/service/tipo-de-limpeza.service';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-servico-listagem',
  templateUrl: './servico-listagem.component.html',
  styleUrls: ['./servico-listagem.component.scss']
})
export class ServicoListagemComponent implements OnInit {
  public servicos: Array<Servico> = new Array();
  public usuario: Usuario = new Usuario();
  public seletor: ServicoSeletor = new ServicoSeletor();
  public atividades: Atividade[]
  public categoriaOcorrencias: Categoria[]
  public tipoDeLimpeza: TipoDeLimpeza[];
  public usuarios: Array<Usuario> = new Array();
  public totalPaginas: number = 1;
  public readonly TAMANHO_PAGINA: number = 10;
  public status: { valor: boolean, texto: string }[] = [
    { valor: false, texto: 'Em andamento' },
    { valor: true, texto: 'Concluída' }
  ];

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
    private tipoDeLimpezaService: TipoDeLimpezaService,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    let usuarioSeletor = new UsuarioSeletor();
    usuarioSeletor.limite = 1000;
    usuarioSeletor.pagina = 0;
    usuarioSeletor.status = { id: 1 } as StatusUsuario;
    usuarioSeletor.cargo = { id: 1 } as Cargo;
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
    this.tipoDeLimpezaService.listarTodos().subscribe(
      (resultado) => {
        this.tipoDeLimpeza = resultado.map((tipoDeLimpeza) => tipoDeLimpeza);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar tipo de limpeza', 'error');
      }
    );
    this.usuarioService.listarComSeletor(usuarioSeletor).subscribe(
      (resultado) => {
        this.usuarios = resultado.map((usuario) => usuario);
      });
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

  filtrarServico() {
    // if (this.seletor.usuario != null) {
    //   this.seletor.usuario = { id: this.seletor.usuario.id } as Usuario;
    // }
    this.servicoService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.servicos = resultado;
        this.contarPaginas();
        this.criarArrayPaginas();
        console.log(this.seletor);

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
