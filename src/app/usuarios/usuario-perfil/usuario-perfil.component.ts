import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Usuario } from 'src/app/shared/model/usuario';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss']
})
export class UsuarioPerfilComponent {
  @ViewChild('ngForm') public ngForm: NgForm;

  public password: string;
  public confirmPassword: string;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public error: boolean = false;
  public usuario: Usuario;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  redefinirSenha(ngForm: NgForm): void {
    if (!ngForm.invalid) {
      if (this.password !== this.confirmPassword) {
        return;
      }

      this.usuario.password = this.password;
      this.usuarioService.redefinirSenha(this.usuario).subscribe({
        next: data => {
          Swal.fire('Sucesso', 'Sua senha foi redefinida com sucesso!', 'success')
            .then(() => {
              this.router.navigate(['/login']);
            });
        },
        error: err => {
          Swal.fire('Erro', 'Ocorreu algum erro ao redefinir a senha. Tente novamente mais tarde.', 'error');
        }
      });
    }
  }
}
