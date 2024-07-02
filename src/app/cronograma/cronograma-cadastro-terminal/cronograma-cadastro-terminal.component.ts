import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { int } from '@zxing/library/esm/customTypings';
import { Cronograma } from 'src/app/shared/model/cronograma';
import { TipoDeLimpeza } from 'src/app/shared/model/tipoDeLimpeza';
import { CronogramaService } from 'src/app/shared/service/cronograma.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cronograma-cadastro-terminal',
  templateUrl: './cronograma-cadastro-terminal.component.html',
  styleUrls: ['./cronograma-cadastro-terminal.component.scss']
})
export class CronogramaCadastroTerminalComponent implements OnInit {
  public cronograma: Cronograma = new Cronograma();
  public meses: { valor: int, texto: string; }[] = [
    { valor: 1, texto: 'Janeiro' },
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
    { valor: 12, texto: 'Dezembro' }
  ];

  @Output() cronogramaCriado: EventEmitter<void> = new EventEmitter<void>();

  public mostrar: boolean = true;
  public esconder: boolean;
  public isLoading: boolean = false;

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
      this.isLoading = true;
      this.cronograma.tipoDeLimpeza = { id: 0 } as TipoDeLimpeza;
      this.cronogramaService.inserir(this.cronograma).subscribe(
        (sucesso) => {
          Swal.fire('Sucesso', 'Cronograma cadastrado!', 'success');
          this.cronograma = new Cronograma();
          this.cronogramaCriado.emit();
          this.isLoading = false;
        },
        (erro) => {
          Swal.fire('Erro', 'Já existe um cronograma criado para esse mês!', 'error');
          this.isLoading = false;
        }
      );
    }
  }
}
