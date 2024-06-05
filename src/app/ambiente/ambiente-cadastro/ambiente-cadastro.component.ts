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

  public mostrar: boolean;
  public esconder: boolean;

  public mostrarCadastro() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }

  @ViewChild('dateField') date!: ElementRef;
  public ambiente: Ambiente = new Ambiente();
  public setores: Setor[] = [];
  public atividades: Atividade[] = [];


  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private ambienteService: AmbienteService,
    private router: Router,
    private route: ActivatedRoute,
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
}