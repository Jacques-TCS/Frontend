import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ambiente } from 'src/app/shared/model/ambiente';
import { AmbienteService } from 'src/app/shared/service/ambiente.service';
import Swal from 'sweetalert2';
import { Setor } from 'src/app/shared/model/setor';
import { SetorService } from 'src/app/shared/service/setor.service';
import { Atividade } from 'src/app/shared/model/atividade';
import { AmbienteTemAtividade } from 'src/app/shared/model/ambienteTemAtividade';

@Component({
  selector: 'app-ambiente-cadastro',
  templateUrl: './ambiente-cadastro.component.html',
  styleUrls: ['./ambiente-cadastro.component.scss']
})
export class AmbienteCadastroComponent implements OnInit {
  public ambiente: Ambiente = new Ambiente();
  public ambientes: Array<Ambiente> = new Array();
  public setores: Setor[] = [];
  public atividades: Atividade[] = [];
  public ambienteTemAtividade: AmbienteTemAtividade = new AmbienteTemAtividade();

  public mostrar: boolean = true;
  public esconder: boolean;

  public mostrarCadastro() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private ambienteService: AmbienteService,
    private router: Router,
    private setorService: SetorService
  ) { }

  ngOnInit(): void {
    // this.setorService.listarTodos().subscribe(
    //   (resultado) => {
    //     this.setores = resultado.map((setor) => setor);
    //   },
    //   (erro) => {
    //     Swal.fire('Erro', 'Erro ao buscar setores', 'error');
    //   }
    // );
    // this.route.params.subscribe(params => {
    //   this.ambiente.id = params['id'];
    // });
  }

  inserirAmbiente(form: NgForm) {
    if (!form.invalid) {
      this.ambienteService.inserir(this.ambiente).subscribe(
        (sucesso) => {
          Swal.fire('Sucesso', 'Ambiente cadastrado!', 'success');
          this.ambiente = new Ambiente();
        },
        (erro) => {
          Swal.fire(
            'Erro', erro.error.message, 'error'
          );
        }
      );
    }
  }
  editar(id: number) {
    this.router.navigate(['/ambientes/edicao', id]);
  }
}