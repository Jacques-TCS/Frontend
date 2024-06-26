import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Ambiente } from 'src/app/shared/model/ambiente';
import { Atividade } from 'src/app/shared/model/atividade';
import { AmbienteSeletor } from 'src/app/shared/model/seletor/ambiente.seletor';
import { Setor } from 'src/app/shared/model/setor';
import { AmbienteService } from 'src/app/shared/service/ambiente.service';
import { AtividadeService } from 'src/app/shared/service/atividade.service';
import { SetorService } from 'src/app/shared/service/setor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ambiente-listagem',
  templateUrl: './ambiente-listagem.component.html',
  styleUrls: ['./ambiente-listagem.component.scss'],
})
export class AmbienteListagemComponent implements OnInit {
  @Output() editarAmbiente = new EventEmitter<number>();
  public ambientes: Array<Ambiente> = new Array();
  public seletor: AmbienteSeletor = new AmbienteSeletor();
  public setores: Array<Setor> = new Array();
  public atividades: Atividade[] = [];
  public totalPaginas: number = 0;
  public readonly TAMANHO_PAGINA: number = 10;

  public mostrar: boolean;
  public esconder: boolean;

  public mostrarFiltros() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }

  public mostrarAmbientes: boolean;
  public esconderAmbientes: boolean;

  public mostrarListagemDeAmbientes() {
    this.mostrarAmbientes = !this.mostrarAmbientes;
    this.esconderAmbientes = !this.esconderAmbientes;
  }

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private ambienteService: AmbienteService,
    private setorService: SetorService,
    private atividadeService: AtividadeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 0;
    this.contarPaginas();
    this.filtrarAmbiente();

    this.atividadeService.listarTodos().subscribe(
      (resultado) => {
        this.atividades = resultado.map((atividade) => atividade);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar atividades', 'error');
      }
    );

    this.setorService.listarTodos().subscribe(
      (resultado) => {
        this.setores = resultado.map((setor) => setor);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar setores', 'error');
      }
    );
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
    this.editarAmbiente.emit(id);
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
