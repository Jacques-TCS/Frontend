import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Atividade } from 'src/app/shared/model/atividade';
import { AtividadeSeletor } from 'src/app/shared/model/seletor/atividade.seletor';
import { AtividadeService } from 'src/app/shared/service/atividade.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent implements OnInit {
  public atividade: Atividade = new Atividade();
  public seletor: AtividadeSeletor = new AtividadeSeletor();
  public atividades: Array<Atividade> = new Array();

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private atividadeService: AtividadeService,
    private router: Router,) { }

  ngOnInit(): void {
    // this.filtrarAtividade();

    // this.atividadeService.listarTodos().subscribe(
    //   (resultado) => {
    //     this.atividades = resultado.map((atividade) => atividade);
    //   },
    //   (erro) => {
    //     Swal.fire('Erro', 'Erro ao buscar atividades', 'error');
    //   }
    // );
  }

  buscarTodos() {
    this.atividadeService.listarTodos().subscribe(
      (resultado) => {
        this.atividades = resultado;
      },
      (erro) => {
        console.log('Erro ao buscar atividades', erro);
      }
    );
  }

  inserirAtividade(form: NgForm) {
    if (!form.invalid) {
      this.atividadeService.inserir(this.atividade).subscribe(
        (sucesso) => {
          Swal.fire('Sucesso', 'atividade cadastrada!', 'success');
          this.atividade = new Atividade();
        },
        (erro) => {
          Swal.fire('Erro', 'error');
        }
      );
    }
  }

  filtrarAtividade() {
    this.atividadeService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.atividades = resultado;
      },
      (erro) => {
        console.log('Erro ao buscar atividades', erro);
      }
    );
  }

  editar(id: Atividade) {
    Swal.fire({
      title: 'Tem certeza de que deseja alterar o nome da atividade?',
      showDenyButton: true,
      confirmButtonText: `Sim`,
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) { }
    })
  }
  
  excluir(id: Atividade) {
    Swal.fire({
      title: 'Tem certeza de que deseja excluir?',
      showDenyButton: true,
      confirmButtonText: `Sim`,
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.atividadeService.excluir(this.atividade.id).subscribe(
          (sucesso) => {
            Swal.fire('Sucesso', 'atividade excluída!', 'success');
            this.atividade = new Atividade();
          },
          (erro) => {
            Swal.fire('Erro', 'error');
          }
        );
      }
    })
  }
}
