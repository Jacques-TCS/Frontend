// import { Datepicker } from 'flowbite-datepicker/Datepicker';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputMaskModule } from '@ngneat/input-mask';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { LoginModule } from './login/login.module';
import { MenuModule } from './menu/menu.module';
import { RequestInterceptor } from './shared/auth/request-interceptor';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    SweetAlert2Module.forRoot(), //https://github.com/sweetalert2/ngx-sweetalert2
    FontAwesomeModule,
    InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
    ZXingScannerModule,
    LoginModule,
    MenuModule,
    NgxMaskDirective,
    NgApexchartsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true
  }, provideNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule { }
