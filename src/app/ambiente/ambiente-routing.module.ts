import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmbienteListagemComponent } from './ambiente-listagem/ambiente-listagem.component';
import { AmbienteCadastroComponent } from './ambiente-cadastro/ambiente-cadastro.component';
import { QRCodeComponent } from './qrcode/qrcode.component';

const routes: Routes = [
  { path: '', component: AmbienteCadastroComponent },
  { path: 'listagem', component: AmbienteListagemComponent },
  { path: 'listagem/qrcode/:id', component: QRCodeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmbienteRoutingModule { }
