import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { int } from '@zxing/library/esm/customTypings';
import { Cronograma } from 'src/app/shared/model/cronograma';
import { CronogramaService } from 'src/app/shared/service/cronograma.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cronograma-cadastro',
  templateUrl: './cronograma-cadastro.component.html',
  styleUrls: ['./cronograma-cadastro.component.scss']
})
export class CronogramaCadastroComponent implements OnInit {
  public cronograma: Cronograma = new Cronograma();
  public meses: { valor: int, texto: string }[] =
    [{ valor: 1, texto: 'Janeiro' },
    { valor: 2, texto: 'Fevereiro' },
    { valor: 3, texto: 'Março' },
    { valor: 4, texto: 'Abril' },
    { valor: 5, texto: 'Maio' },
    { valor: 6, texto: 'Junho' },
    { valor: 7, texto: 'Julho' },
    { valor: 8, texto: 'Agosto' },
    { valor: 9, texto: 'Setembro' },
    { valor: 10, texto: 'Outubro' },
    { valor: 11, texto: 'Novembro' },
    { valor: 12, texto: 'Dezembro' }];

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

  // Ver qual foi selecionado (terminal ou concorrente) e associar esse valor 
  // ao atributo tipoDeLimpeza do objeto cronograma
  // this.cronograma.tipoDeLiMpeza = tipoDeLimpeza;
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
