import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ambiente } from 'src/app/shared/model/ambiente';
import { AmbienteService } from 'src/app/shared/service/ambiente.service';
import Swal from 'sweetalert2';
import { Setor } from 'src/app/shared/model/setor';
import { Atividade } from 'src/app/shared/model/atividade';
import { AmbienteTemAtividade } from 'src/app/shared/model/ambienteTemAtividade';
import { AtividadeService } from 'src/app/shared/service/atividade.service';
import { SetorService } from 'src/app/shared/service/setor.service';
import { AmbienteListagemComponent } from '../ambiente-listagem/ambiente-listagem.component';
import { AtividadeSeletor } from 'src/app/shared/model/seletor/atividade.seletor';

@Component({
  selector: 'app-ambiente-cadastro',
  templateUrl: './ambiente-cadastro.component.html',
  styleUrls: ['./ambiente-cadastro.component.scss']
})
export class AmbienteCadastroComponent implements OnInit {
  public ambiente: Ambiente = new Ambiente();
  public ambientes: Array<Ambiente> = new Array();
  public setores: Array<Setor> = new Array();
  public atividades: Atividade[] = [];
  public ambienteTemAtividade: AmbienteTemAtividade = new AmbienteTemAtividade();
  public atividadeSelected: Atividade = new Atividade();
  public setorSelected: string = '';
  public frequenciaDeLimpezasConcorrente: string[] = ['1x ao dia', '2x ao dia', '3x ao dia'];
  public frequenciaDeLimpezasTerminal: string[] = ['Semanal', 'Quinzenal'];
  public id: number | null = null;
  public isDisplayed: boolean = false;
  public atividadeSeletor: AtividadeSeletor = new AtividadeSeletor();

  public mostrar: boolean = true;
  public esconder: boolean;

  public mostrarCadastro() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }
  @ViewChild('listagemAmbiente') listagemAmbiente: AmbienteListagemComponent;
  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private ambienteService: AmbienteService,
    private atividadeService: AtividadeService,
    private setorService: SetorService,
  ) { }

  ngOnInit(): void {
    this.atividadeSeletor.limite = 1000;
    this.atividadeSeletor.pagina = 0;
    this.atividadeService.listarComSeletor(this.atividadeSeletor).subscribe(
      (resultado) => {
        this.atividades = resultado.filter((atividade) => atividade.status === true);
        this.ambiente.atividades = [];
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
    this.hideAnimatedDiv();
  }

  hideAnimatedDiv() {
    setTimeout(() => {
      this.isDisplayed = false;
    }, 5000);
  }

  inserirAmbiente(form: NgForm) {
    if (this.id != null) {
      this.ambienteService.atualizar(this.ambiente).subscribe(
        (sucesso) => {
          Swal.fire('Sucesso', 'Ambiente atualizado!', 'success');
          this.ambiente = new Ambiente();
          this.ambiente.setor = new Setor();
          this.setorSelected = '';
          this.atividadeSelected = new Atividade();
          this.id = null;
          this.refreshListagemAmbiente();
        },
        (erro) => {
          Swal.fire(
            'Erro', erro.error.message, 'error'
          );
        }
      );
    }
    else if (!form.invalid) {
      this.ambienteService.inserir(this.ambiente).subscribe(
        (sucesso) => {
          Swal.fire('Sucesso', 'Ambiente cadastrado!', 'success');
          this.ambiente = new Ambiente();
          this.ambiente.setor = new Setor();
          this.setorSelected = '';
          this.atividadeSelected = new Atividade();
          this.refreshListagemAmbiente();
        },
        (erro) => {
          Swal.fire(
            'Erro', erro.error.message, 'error'
          );
        }
      );
    }
    else {
      this.isDisplayed = true;
      this.hideAnimatedDiv();
    }
  }

  refreshListagemAmbiente() {
    if (this.listagemAmbiente) {
      this.listagemAmbiente.filtrarAmbiente();
    }
  }

  editar(id: number) {
    this.ambienteService.consultarPorId(id).subscribe(
      (resultado) => {
        this.id = id;
        this.ambiente = resultado;
        this.setorSelected = '';
        this.atividadeSelected = new Atividade();
        this.refreshListagemAmbiente();
      },
      (erro) => {
        console.log('Erro ao editar ambiente', erro);
      }
    );
  }

  associarAtividade() {
    const novaAtividade: AmbienteTemAtividade = new AmbienteTemAtividade();
    novaAtividade.atividade = this.atividadeSelected;
    novaAtividade.frequenciaManha = '';
    novaAtividade.frequenciaTarde = '';
    novaAtividade.frequenciaNoite = '';
    novaAtividade.frequenciaTerminal = '';
    this.ambiente.atividades.push(novaAtividade);
  }

  selecionarAtividade() {
    if (this.atividadeSelected.id == null || Object.keys(this.atividadeSelected).length == 0) {
      Swal.fire('Erro', 'Selecione uma atividade', 'error');
    } else if (this.ambiente.atividades.length == 0) {
      this.associarAtividade();
    } else if (this.ambiente.atividades.filter((atividade) => atividade.atividade.id == this.atividadeSelected.id).length == 0) {
      this.associarAtividade();
    } else {
      Swal.fire('Erro', 'Atividade já cadastrada', 'error');
    }
  }

  trazerAtividadesPorSetor(setorSelected: string) {
    const setor = this.setores.find((setor) => setor.nome == setorSelected);
    this.ambiente.atividades = setor!.atividades;
    this.ambiente.setor = setor!;
  }

  excluir(ambienteTemAtividade: AmbienteTemAtividade) {
    this.ambiente.atividades = this.ambiente.atividades.filter((atividade) => atividade !== ambienteTemAtividade);
  }

}

