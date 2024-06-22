import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent {

  @ViewChild('ngForm')
  public ngForm: NgForm;

  public email: string;
  public error: boolean = false
  public isDisplayed: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit() {
    this.hideAnimatedDiv();
  }

  hideAnimatedDiv() {
    setTimeout(() => {
      this.isDisplayed = false;
    }, 5000);
  }

  recuperarSenha(ngForm: NgForm): void {
    if (!ngForm.invalid) {
      this.authService.recuperarSenha(this.email).subscribe({
        next: data => {
          Swal.fire('Sucesso', 'Verifique a caixa de entrada do seu e-mail!', 'success')
            .then(() => {
              this.router.navigate(['/login']);
            });
        },
        error: err => {
          Swal.fire('Erro', 'Ocorreu algum erro ao solicitar a recuperação da senha. Tente novamente mais tarde. Se o erro persistir, entre em contato com o administrador do sistema.', 'error');
        }
      })
    } else {
      this.isDisplayed = true;
      this.hideAnimatedDiv();
    }
  }
}
