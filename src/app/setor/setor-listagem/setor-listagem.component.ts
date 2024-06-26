import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Atividade } from 'src/app/shared/model/atividade';
import { SetorSeletor } from 'src/app/shared/model/seletor/setor.seletor';
import { Setor } from 'src/app/shared/model/setor';
import { AtividadeService } from 'src/app/shared/service/atividade.service';
import { SetorService } from 'src/app/shared/service/setor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setor-listagem',
  templateUrl: './setor-listagem.component.html',
  styleUrls: ['./setor-listagem.component.scss']
})
export class SetorListagemComponent implements OnInit {
  @Output() editarSetor = new EventEmitter<number>();
  public setores: Array<Setor> = new Array();
  public seletor: SetorSeletor = new SetorSeletor();
  public atividades: Atividade[];

  public totalPaginas: number = 0;
  public readonly TAMANHO_PAGINA: number = 10;

  public mostrar: boolean;
  public esconder: boolean;

  public mostrarFiltros() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }

  public mostrarSetores: boolean;
  public esconderSetores: boolean;

  public mostrarListagemDeSetores() {
    this.mostrarSetores = !this.mostrarSetores;
    this.esconderSetores = !this.esconderSetores;
  }

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private setorService: SetorService,
    private atividadeService: AtividadeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 0;
    this.contarPaginas();
    this.filtrarSetor();

    this.atividadeService.listarTodos().subscribe(
      (resultado) => {
        this.atividades = resultado.map((atividade) => atividade);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar atividades', 'error');
      }
    );
  }

  public contarPaginas() {
    this.setorService.contarPaginas(this.seletor).subscribe(
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

  filtrarSetor() {
    this.setorService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.setores = resultado;
      },
      (erro) => {
        console.log('Erro ao buscar setores', erro);
      }
    );
  }

  editar(id: number) {
    this.editarSetor.emit(id);
  }

  atualizarPaginacao() {
    this.contarPaginas();
    this.irParaPagina(0);
    this.filtrarSetor();
  }

  avancarPagina() {
    this.seletor.pagina++;
    this.filtrarSetor();
  }

  voltarPagina() {
    this.seletor.pagina--;
    this.filtrarSetor();
  }

  irParaPagina(indicePagina: number) {
    this.seletor.pagina = indicePagina;
    this.filtrarSetor();
  }

}

