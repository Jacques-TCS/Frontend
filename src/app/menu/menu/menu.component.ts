import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(private authService: AuthService){}

  title = 'SistemaRegistroVerificacao';
  isDarkTheme: boolean;
  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  nome: String = '';
  username: String;
  perfil: String;

  ngOnInit(): void {
    initFlowbite();
    this.isDarkTheme = localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    this.updateTheme();
    this.nome = localStorage.getItem('nome') ?? '';
    this.username = localStorage.getItem('username') ?? '';
    this.perfil = localStorage.getItem('perfil') ?? '';
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('color-theme', this.isDarkTheme ? 'dark' : 'light');
    this.updateTheme();
  }

  handleLogout(): void {
    this.authService.logout()
  }

  private updateTheme(): void {
    if (this.isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
