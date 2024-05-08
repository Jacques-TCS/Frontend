import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

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

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  autenticar(ngForm: NgForm): void {
    if(!ngForm.invalid){
      this.authService.login(this.username, this.password).subscribe({
        next: data => {
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          this.isLoginFailed = true
        }
      })
    }
    // this.router.navigate(['/dashboard']);
  }

  esqueciMinhaSenha(): void {
    this.router.navigate(['/dashboard']);
  }
}
