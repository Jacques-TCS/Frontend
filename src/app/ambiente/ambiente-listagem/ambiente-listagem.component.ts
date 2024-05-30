import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Ambiente } from 'src/app/shared/model/ambiente';
import { Atividade } from 'src/app/shared/model/atividade';
import { AmbienteSeletor } from 'src/app/shared/model/seletor/ambiente.seletor';
import { Setor } from 'src/app/shared/model/setor';
import { AmbienteService } from 'src/app/shared/service/ambiente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ambiente-listagem',
  templateUrl: './ambiente-listagem.component.html',
  styleUrls: ['./ambiente-listagem.component.scss'],
})
export class AmbienteListagemComponent implements OnInit {
  public ambientes: Array<Ambiente> = new Array();
  public seletor: AmbienteSeletor = new AmbienteSeletor();
  public atividades: Atividade[];
  public setores: Setor[];
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
    private ambienteService: AmbienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //  this.seletor.limite = this.TAMANHO_PAGINA;
    //  this.seletor.pagina = 0;
    // this.contarPaginas();
    this.filtrarAmbiente();
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
    return Array(this.totalPaginas)
      .fill(0)
      .map((x, i) => i + 1);
  }

  buscarTodos() {
    this.ambienteService.listarTodos().subscribe(
      (resultado) => {
        this.ambientes = resultado;
      },
      (erro) => {
        console.log('Erro ao buscar ambientes', erro);
      }
    );
  }

  filtrarAmbiente() {
    this.ambienteService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.ambientes = resultado;
      },
      (erro) => {
        console.log('Erro ao buscar ambientes', erro);
      }
    );
  }

  editar(id: number) {
    this.router.navigate(['/ambientes/edicao', id]);
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

}
