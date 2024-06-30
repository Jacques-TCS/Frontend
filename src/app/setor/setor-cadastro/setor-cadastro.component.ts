import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Atividade } from 'src/app/shared/model/atividade';
import { Setor } from 'src/app/shared/model/setor';
import { SetorTemAtividade } from 'src/app/shared/model/setorTemAtividade';
import { AtividadeService } from 'src/app/shared/service/atividade.service';
import { SetorService } from 'src/app/shared/service/setor.service';
import Swal from 'sweetalert2';
import { SetorListagemComponent } from '../setor-listagem/setor-listagem.component';

@Component({
  selector: 'app-setor-cadastro',
  templateUrl: './setor-cadastro.component.html',
  styleUrls: ['./setor-cadastro.component.scss']
})
export class SetorCadastroComponent implements OnInit {

  public setor: Setor = new Setor();
  public setores: Array<Setor> = new Array();
  public atividades: Atividade[] = [];
  public setorTemAtividade: SetorTemAtividade = new SetorTemAtividade();
  public atividadeSelected: Atividade = new Atividade();
  public frequenciaDeLimpezasConcorrente: string[] = ['1x ao dia', '2x ao dia', '3x ao dia'];
  public frequenciaDeLimpezasTerminal: string[] = ['Semanal', 'Quinzenal'];
  public id: number | null = null;
  public isDisplayed: boolean = false;

  public mostrar: boolean = true;
  public esconder: boolean;

  public mostrarCadastro() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }
  @ViewChild('listagemSetor') listagemSetor: SetorListagemComponent;
  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private setorService: SetorService,
    private atividadeService: AtividadeService,
  ) { }

  ngOnInit(): void {
    this.atividadeService.listarTodos().subscribe(
      (resultado) => {
        this.atividades = resultado.map((atividade) => atividade);
        this.setor.atividades = [];
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar atividades', 'error');
      }
    );

    if (this.id != null) {
      console.log(this.id);
    }

    this.hideAnimatedDiv();
  }

  hideAnimatedDiv() {
    setTimeout(() => {
      this.isDisplayed = false;
    }, 5000);
  }

  inserirSetor(form: NgForm) {
    if (this.id != null) {
      this.setorService.atualizar(this.setor).subscribe(
        (sucesso) => {
          Swal.fire('Sucesso', 'Setor atualizado!', 'success');
          this.setor = new Setor();
          this.setor.atividades = [];
          this.atividadeSelected = new Atividade();
          this.id = null;
          this.refreshListagemSetor();
        },
        (erro) => {
          Swal.fire('Erro', erro.error.message, 'error');
        }
      );
    } else if (!form.invalid) {
      this.setorService.inserir(this.setor).subscribe(
        (sucesso) => {
          Swal.fire('Sucesso', 'Setor cadastrado!', 'success');
          this.setor = new Setor();
          this.setor.atividades = [];
          this.atividadeSelected = new Atividade();
          this.refreshListagemSetor();
        },
        (erro) => {
          Swal.fire('Erro', erro.error.message, 'error');
        }
      );
    } else {
      this.isDisplayed = true;
      this.hideAnimatedDiv();
    }
  }

  refreshListagemSetor() {
    if (this.listagemSetor) {
      this.listagemSetor.filtrarSetor();
    }
  }

  excluir(setorTemAtividade: SetorTemAtividade) {
    this.setor.atividades = this.setor.atividades.filter((atividade) => atividade !== setorTemAtividade);
  }

  editar(id: number) {
    this.setorService.consultarPorId(id).subscribe(
      (resultado) => {
        this.id = id;
        this.setor = resultado;
        this.refreshListagemSetor();
      },
      (erro) => {
        console.log('Erro ao editar setor', erro);
      }
    );
  }

  associarAtividade() {
    const novaAtividade: SetorTemAtividade = new SetorTemAtividade();
    novaAtividade.atividade = this.atividadeSelected;
    novaAtividade.frequenciaManha = '';
    novaAtividade.frequenciaTarde = '';
    novaAtividade.frequenciaNoite = '';
    novaAtividade.frequenciaTerminal = '';
    this.setor.atividades.push(novaAtividade);
  }

  selecionarAtividade() {
    if (this.atividadeSelected.id == null || Object.keys(this.atividadeSelected).length == 0) {
      Swal.fire('Erro', 'Selecione uma atividade', 'error');
    } else if (this.setor.atividades.length == 0) {
      this.associarAtividade();
    } else if (this.setor.atividades.filter((atividade) => atividade.atividade.id == this.atividadeSelected.id).length == 0) {
      this.associarAtividade();
    } else {
      Swal.fire('Erro', 'Atividade já cadastrada', 'error');
    }
  }
}
