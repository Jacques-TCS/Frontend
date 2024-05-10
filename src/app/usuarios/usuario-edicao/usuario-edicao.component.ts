import { StatusUsuario } from './../../shared/model/status-usuario';
import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { forkJoin } from 'rxjs';
import { Cargo } from 'src/app/shared/model/cargo';
import { Usuario } from 'src/app/shared/model/usuario';
import { CargoService } from 'src/app/shared/service/cargo.service';
import { StatusUsuarioService } from 'src/app/shared/service/statusUsuario.service';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-edicao',
  templateUrl: './usuario-edicao.component.html',
  styleUrls: ['./usuario-edicao.component.scss']
})
export class UsuarioEdicaoComponent {

  public usuario: Usuario = new Usuario();
  public cargos: Cargo[];
  public statusUsuario: StatusUsuario[];
  public idUsuario: number;

  @ViewChild('ngForm')
  public ngForm: NgForm;

  mascaraTelefone = createMask('(99) 99999-9999');
  telefone = new FormControl('');

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private cargoService: CargoService,
    private statusUsuarioService: StatusUsuarioService,
  ) {}

  loading = true;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idUsuario = params['id'];
      if(this.idUsuario){
        this.buscarUsuario();
        forkJoin({
        cargos: this.cargoService.listarTodos(),
        statusUsuario: this.statusUsuarioService.listarTodos()
      }).subscribe(({ cargos, statusUsuario }) => {
        this.cargos = cargos;
        this.statusUsuario = statusUsuario;
        this.loading = false;
      }, (erro) => {
        Swal.fire('Erro', 'Erro ao buscar dados', 'error');
        this.loading = false;
      });
      }
    });
  }

  atualizarUsuario() {
    this.usuarioService.atualizar(this.usuario).subscribe(
      (sucesso) => {
        Swal.fire('Sucesso', 'Usuario atualizado!', 'success');
      },
      (erro) => {
        Swal.fire(
          'Erro', erro.error.message, 'error'
        );
      }
    );
  }

  buscarUsuario(){
    this.usuarioService.pesquisarPorId(this.idUsuario).subscribe(
      resultado => {
        this.usuario = resultado;
      },
      erro => {
        Swal.fire("Erro", "Erro ao buscar o usuário com id ("
                      + this.idUsuario + ") : " + erro, 'error');
      }
    );
  }

  public compareById(r1: any, r2: any): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }
}
