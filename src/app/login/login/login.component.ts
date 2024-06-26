import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('ngForm')
  public ngForm: NgForm;

  public username: string;
  public password: string;
  public isLoginFailed: boolean = false
  showPassword: boolean = false;
  public isDisplayed: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

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

  autenticar(ngForm: NgForm): void {
    if(!ngForm.invalid){
      this.authService.login(this.username, this.password).subscribe({
        next: data => {
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          let message = 'Usuário ou senha inválidos.';
          if(err.message === 'Usuário sem permissão de acesso.') {
            message = err.message;
          }
          this.isLoginFailed = true
          Swal.fire('Erro', message, 'error');
          this.username = '';
          this.password = '';
        }
      })
    } else {
      this.isDisplayed = true;
      this.hideAnimatedDiv();
    }
  }

  esqueciMinhaSenha(): void {
    this.router.navigate(['/recuperar-senha']);
  }
}
