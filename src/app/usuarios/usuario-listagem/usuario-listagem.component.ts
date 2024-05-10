import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from './../../shared/service/usuario.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioSeletor } from 'src/app/shared/model/seletor/usuario.seletor';
import { Usuario } from 'src/app/shared/model/usuario';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html',
  styleUrls: ['./usuario-listagem.component.scss'],
})
export class UsuarioListagemComponent implements OnInit {
  public usuarios: Array<Usuario> = new Array();
  public seletor: UsuarioSeletor = new UsuarioSeletor();
  public cargos: string[];
  public status: string[];
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 1;
    this.filtrarUsuario();
    this.contarPaginas();
    // this.seletor.limite = 5;
    // this.seletor.pagina = ;
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
    return Array(this.totalPaginas).fill(0).map((x, i) => i + 1);
  }

  buscarTodos() {
    this.usuarioService.listarTodos().subscribe(
      (resultado) => {
        this.usuarios = resultado;
      },
      (erro) => {
        console.log('Erro ao buscar usuarios', erro);
      }
    );
  }

  filtrarUsuario() {
    this.usuarioService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.usuarios = resultado;
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
