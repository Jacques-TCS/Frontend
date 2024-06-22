import { Component, ViewChild } from '@angular/core';
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
  public usuario: Usuario = new Usuario();
  public isDisplayed: boolean = false;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit() {
    this.hideAnimatedDiv();
  }

  hideAnimatedDiv() {
    setTimeout(() => {
      this.isDisplayed = false;
    }, 5000);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  redefinirSenha(ngForm: NgForm): void {
    if (!ngForm.invalid) {
      if (this.password !== this.confirmPassword) {
        Swal.fire('Erro', 'As senhas não coincidem.', 'error');
        this.password = '';
        this.confirmPassword = '';
        return;
      }

      this.usuario.password = this.password;
      this.usuarioService.redefinirSenha(this.password).subscribe({
        next: data => {
          Swal.fire('Sucesso', 'Sua senha foi redefinida com sucesso!', 'success');
          this.isDisplayed = false;
          this.password = '';
          this.confirmPassword = '';
        },
        error: err => {
          Swal.fire('Erro', 'Ocorreu algum erro ao redefinir a senha. Tente novamente mais tarde.', 'error');
        }
      });
    } else {
      this.isDisplayed = true;
      this.hideAnimatedDiv();
    }
  }
}
