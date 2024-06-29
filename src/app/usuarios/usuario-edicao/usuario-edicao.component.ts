import { StatusUsuario } from './../../shared/model/status-usuario';
import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  public isDisplayed: boolean = false;

  @ViewChild('ngForm')
  public ngForm: NgForm;

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
    this.hideAnimatedDiv();
    this.cargoService.listarTodos().subscribe(
      (resultado) => {
        this.cargos = resultado.map((cargo) => cargo);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar cargos', 'error');
      }
    );
    this.statusUsuarioService.listarTodos().subscribe(
      (resultado) => {
        this.statusUsuario = resultado.map((StatusUsuario) => StatusUsuario);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar StatusUsuarios', 'error');
      }
    );
    this.route.params.subscribe(params => {
      this.idUsuario = params['id'];
      if(this.idUsuario){
        this.buscarUsuario();
        forkJoin({
        cargos: this.cargoService.listarTodos(),
        statusUsuario: this.statusUsuarioService.listarTodos()
      }).subscribe(({ cargos, statusUsuario }) => {
        if (this.usuario && this.usuario.telefone) {
          this.usuario.telefone = this.applyPhoneMask(this.usuario.telefone);
        }
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

  hideAnimatedDiv() {
    setTimeout(() => {
      this.isDisplayed = false;
    }, 5000);
  }

  atualizarUsuario(ngForm: NgForm) {
    if(!ngForm.invalid){
      this.usuarioService.atualizar(this.usuario).subscribe(
        (sucesso) => {
          Swal.fire('Sucesso', 'Usuario atualizado!', 'success');
          this.router.navigate(['usuarios/listagem']);
          this.isDisplayed = false;
        },
        (erro) => {
          Swal.fire(
            'Erro', erro.error.message, 'error'
          );
        }
      );
    } else {
      this.isDisplayed = true;
      this.hideAnimatedDiv();
    }
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

  onInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else {
      value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
    }
    event.target.value = value;
  }

  applyPhoneMask(telefone: string): string {
    let value = telefone.replace(/\D/g, '');
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else {
      value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
    }
    return value;
  }

  public compareById(r1: any, r2: any): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }
}
