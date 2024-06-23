import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SistemaRegistroVerificacao';
  isDarkTheme: boolean;

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {
    initFlowbite();
    this.isDarkTheme = localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    this.updateTheme();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.applyBackground(event.urlAfterRedirects);
      }
    });

    // Initial background setup
    this.applyBackground(this.router.url);
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('color-theme', this.isDarkTheme ? 'dark' : 'light');
    this.updateTheme();
  }

  private updateTheme(): void {
    if (this.isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  private applyBackground(url: string): void {
    if (url === '/login' || url === '/recuperar-senha') {
      this.renderer.removeClass(document.body, 'bg-gray-200');
      this.renderer.removeClass(document.body, 'dark:bg-gray-800');
      this.renderer.addClass(document.body, 'bg-background-logo');
      this.renderer.addClass(document.body, 'dark:bg-background-logo');
    } else {
      this.renderer.removeClass(document.body, 'bg-background-logo');
      this.renderer.removeClass(document.body, 'dark:bg-background-logo');
      this.renderer.addClass(document.body, 'bg-gray-200');
      this.renderer.addClass(document.body, 'dark:bg-gray-800');
    }
  }
}
