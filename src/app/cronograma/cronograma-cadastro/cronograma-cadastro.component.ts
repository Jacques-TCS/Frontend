import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Cronograma } from 'src/app/shared/model/cronograma';
import { CronogramaService } from 'src/app/shared/service/cronograma.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cronograma-cadastro',
  templateUrl: './cronograma-cadastro.component.html',
  styleUrls: ['./cronograma-cadastro.component.scss']
})
export class CronogramaCadastroComponent implements OnInit {
  cronograma: Cronograma = new Cronograma();

  public mostrar: boolean = true;
  public esconder: boolean;

  public mostrarCadastro() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private cronogramaService: CronogramaService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  inserirCronograma(form: NgForm) {
    if (!form.invalid) {
      this.cronogramaService.inserir(this.cronograma).subscribe(
        (sucesso) => {
          Swal.fire('Sucesso', 'cronograma cadastrado!', 'success');
          this.cronograma = new Cronograma();
        },
        (erro) => {
          Swal.fire('Erro', 'error');
        }
      );
    }
  }
}
