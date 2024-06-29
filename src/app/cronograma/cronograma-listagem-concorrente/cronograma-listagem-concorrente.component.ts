import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Atividade } from 'src/app/shared/model/atividade';
import { Cargo } from 'src/app/shared/model/cargo';
import { Cronograma } from 'src/app/shared/model/cronograma';
import { ServicoSeletor } from 'src/app/shared/model/seletor/servico.seletor';
import { UsuarioSeletor } from 'src/app/shared/model/seletor/usuario.seletor';
import { Servico } from 'src/app/shared/model/servico';
import { StatusUsuario } from 'src/app/shared/model/status-usuario';
import { TipoDeLimpeza } from 'src/app/shared/model/tipoDeLimpeza';
import { Usuario } from 'src/app/shared/model/usuario';
import { AtividadeService } from 'src/app/shared/service/atividade.service';
import { ServicoService } from 'src/app/shared/service/servico.service';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cronograma-listagem-concorrente',
  templateUrl: './cronograma-listagem-concorrente.component.html',
  styleUrls: ['./cronograma-listagem-concorrente.component.scss']
})
export class CronogramaListagemConcorrenteComponent implements OnInit {
  public cronograma: Cronograma = new Cronograma();
  public cronogramas: Array<Cronograma> = new Array();
  public servicos: Array<Servico> = new Array();
  public seletor: ServicoSeletor = new ServicoSeletor();
  public atividades: Atividade[];
  public usuario: Usuario = new Usuario();
  public usuarios: Array<Usuario> = new Array();

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

  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;

  @ViewChild('checkMaster') checkMaster: ElementRef;

  constructor(
    private servicoService: ServicoService,
    private usuarioService: UsuarioService,
    private atividadeService: AtividadeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 0;
    this.contarPaginas();
    this.filtrarCronograma();

    let usuarioSeletor = new UsuarioSeletor();
    usuarioSeletor.limite = 1000;
    usuarioSeletor.pagina = 0;
    usuarioSeletor.status = { id: 1 } as StatusUsuario;
    usuarioSeletor.cargo = { id: 1 } as Cargo;
    this.usuarioService.listarComSeletor(usuarioSeletor).subscribe(
      (resultado) => {
        this.usuarios = resultado.map((usuario) => usuario);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar usuarios', 'error');
      }
    );

    this.atividadeService.listarTodos().subscribe(
      (resultado) => {
        this.atividades = resultado.map((usuario) => usuario);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar atividades', 'error');
      }
    );
  }

  public contarPaginas() {
    this.servicoService.contarPaginas(this.seletor).subscribe(
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


  public filtrarCronograma() {
    this.seletor.tipoDeLimpeza = { id: 1 } as TipoDeLimpeza;
    if (this.seletor.usuario != null) {
      this.seletor.usuario = { id: this.seletor.usuario.id } as Usuario;
    }
    this.servicoService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.servicos = resultado;
        this.contarPaginas();
        this.criarArrayPaginas();
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

  public selecionarTodos(): void {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = this.checkMaster.nativeElement.checked;
    });
  }

  public atribuirFuncionario() {
    let servicosSelecionados = new Array<number>();
    this.checkboxes.forEach((element) => {
      if (element.nativeElement.checked) {
        servicosSelecionados.push(element.nativeElement.value);
      }
    });
    if (servicosSelecionados.length === 0) {
      Swal.fire('Erro', 'Nenhum serviço selecionado', 'error');
      return;
    }
    this.servicoService.atribuirFuncionario(this.usuario.id, servicosSelecionados).subscribe(
      (resultado) => {
        Swal.fire('Sucess', 'Funcionário atribuído', 'success');
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao atribuir funcionário ao serviço', 'error');
      }
    );
  }

  fileName = 'ExcleSheet.xlsx';
  exportarPlanilhaCronConcorrente() {
    let data = document.getElementById('tabela-ocorrencia');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Planilha');

    XLSX.writeFile(wb, this.fileName);
  }
}


