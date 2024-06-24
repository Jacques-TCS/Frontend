import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from './../../shared/service/usuario.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioSeletor } from 'src/app/shared/model/seletor/usuario.seletor';
import { Usuario } from 'src/app/shared/model/usuario';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { Cargo } from 'src/app/shared/model/cargo';
import { StatusUsuario } from 'src/app/shared/model/status-usuario';
import { CargoService } from 'src/app/shared/service/cargo.service';
import { StatusUsuarioService } from 'src/app/shared/service/statusUsuario.service';

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html',
  styleUrls: ['./usuario-listagem.component.scss'],
})
export class UsuarioListagemComponent implements OnInit {
  public usuarios: Array<Usuario> = new Array();
  public seletor: UsuarioSeletor = new UsuarioSeletor();
  public cargos: Cargo[];
  public status: StatusUsuario[];
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
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private cargoService: CargoService,
    private statusUsuarioService: StatusUsuarioService
  ) {}

  ngOnInit(): void {
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 0;
    this.filtrarUsuario();
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
    this.usuarioService.contarPaginas(this.seletor).subscribe(
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

  filtrarUsuario() {
    this.usuarioService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.usuarios = resultado;
        this.contarPaginas();
        this.criarArrayPaginas();
      },
      (erro) => {
        console.log('Erro ao buscar usuarios', erro);
      }
    );
  }

  voltarUsuario() {
    this.router.navigate(['/dashboard/']);
  }

  editar(id: number){
    this.router.navigate(['/usuarios/edicao', id]);
  }

  afastar(id: number){
    this.router.navigate(['/usuarios/afastamento', id]);
  }

  fileName = 'ExcleSheet.xlsx';
  exportarPlanilhaUsuario() {
    let data = document.getElementById('tabela-usuarios');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Planilha');

    XLSX.writeFile(wb, this.fileName);
  }

  atualizarPaginacao() {
    this.contarPaginas();
    this.irParaPagina(0);
    this.filtrarUsuario();
  }

  avancarPagina() {
    this.seletor.pagina++;
    this.filtrarUsuario();
  }

  voltarPagina() {
    this.seletor.pagina--;
    this.filtrarUsuario();
  }

  irParaPagina(indicePagina: number) {
    this.seletor.pagina = indicePagina;
    this.filtrarUsuario();
  }
}
