import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/shared/model/atividade';
import { Setor } from 'src/app/shared/model/setor';
import { SetorTemAtividade } from 'src/app/shared/model/setorTemAtividade';
import { AtividadeService } from 'src/app/shared/service/atividade.service';
import { SetorService } from 'src/app/shared/service/setor.service';
import Swal from 'sweetalert2';

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

  public mostrar: boolean = true;
  public esconder: boolean;

  public mostrarCadastro() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }
  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private setorService: SetorService,
    private atividadeService: AtividadeService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.setor.atividades = [];

    this.atividadeService.listarTodos().subscribe(
      (resultado) => {
        this.atividades = resultado.map((atividade) => atividade);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar atividades', 'error');
      }
    );

    if (this.id != null) {
      console.log(this.id);
    }
  }

  inserirSetor(form: NgForm) {
    if (this.id != null) {
      this.setorService.atualizar(this.setor).subscribe(
        (sucesso) => {
          Swal.fire('Sucesso', 'Setor atualizado!', 'success');
          this.setor = new Setor();
          this.id = null;
        },
        (erro) => {
          Swal.fire(
            'Erro', erro.error.message, 'error'
          );
        }
      );
    }
    else if (!form.invalid) {
      this.setorService.inserir(this.setor).subscribe(
        (sucesso) => {
          Swal.fire('Sucesso', 'Setor cadastrado!', 'success');
          this.setor = new Setor();
        },
        (erro) => {
          Swal.fire(
            'Erro', erro.error.message, 'error'
          );
        }
      );
    }
  }

  excluir(setorTemAtividade: SetorTemAtividade) {
    this.setor.atividades = this.setor.atividades.filter((atividade) => atividade !== setorTemAtividade);
  }

  editar(id: number) {
    this.setorService.consultarPorId(id).subscribe(
      (resultado) => {
        this.setor = resultado;
      },
      (erro) => {
        console.log('Erro ao editar setor', erro);
      }
    );
  }

  //TODO Fazer validação para que quando o id do setor for diferente de null, o array não seja sobrescrito
  //TODO Fazer validação para que não seja possível adicionar atividades nulas
  selecionarAtividade() {
    if (this.atividadeSelected.id == null || Object.keys(this.atividadeSelected).length != 0) {
      const atividadesDuplicadas = this.setor.atividades.filter((atividade) => atividade.atividade.id == this.atividadeSelected.id);
      if (atividadesDuplicadas.length > 0) {
        Swal.fire('Erro', 'Atividade já cadastrada', 'error');
      } else {
        const novaAtividade: SetorTemAtividade = new SetorTemAtividade();
        novaAtividade.atividade = this.atividadeSelected;
        novaAtividade.frequenciaManha = '';
        novaAtividade.frequenciaTarde = '';
        novaAtividade.frequenciaNoite = '';
        novaAtividade.frequenciaTerminal = '';
        this.setor.atividades.push(novaAtividade);
        console.log(this.setor.atividades);
      }
    }
  }

}
