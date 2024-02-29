import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { Usuario } from 'src/app/shared/model/usuario';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-edicao',
  templateUrl: './usuario-edicao.component.html',
  styleUrls: ['./usuario-edicao.component.scss']
})
export class UsuarioEdicaoComponent {

  public usuario: Usuario = new Usuario();
  public cargos: string[] = [];
  public statusUsuario: string[] = [];
  public niveis: string[] = [];
  public idUsuario: number;

  @ViewChild('ngForm')
  public ngForm: NgForm;

  mascaraCpf = createMask('999.999.999-99');
  cpf = new FormControl('');

  mascaraTelefone = createMask('(99) 99999-9999');
  telefone = new FormControl('');

  mascaraCtps = createMask('9999999/9999');
  ctps = new FormControl('');

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.usuarioService.listarCargos().subscribe(
      (resultado) => {
        this.cargos = resultado;
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar os cargos: ' + erro, 'error');
      }
    );

    this.usuarioService.listarStatus().subscribe(
      (resultado) => {
        this.statusUsuario = resultado;
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar os starus: ' + erro, 'error');
      }
    );

    this.usuarioService.listarNiveis().subscribe(
      (resultado) => {
        this.niveis = resultado;
      },
      (erro) => {
        Swal.fire(
          'Erro',
          'Erro ao buscar os níveis de acesso: ' + erro,
          'error'
        );
      }
    );

    this.route.params.subscribe(params => {
      this.idUsuario = params['id'];

      if(this.idUsuario){
        this.buscarUsuario();
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
}
