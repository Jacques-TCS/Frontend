import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { int } from '@zxing/library/esm/customTypings';
import { Cronograma } from 'src/app/shared/model/cronograma';
import { TipoDeLimpeza } from 'src/app/shared/model/tipoDeLimpeza';
import { CronogramaService } from 'src/app/shared/service/cronograma.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cronograma-home',
  templateUrl: './cronograma-home.component.html',
  styleUrls: ['./cronograma-home.component.scss']
})
export class CronogramaHomeComponent {
  public mostrar: boolean = true;
  public esconder: boolean;

  public mostrarCadastro() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }
}
