import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicoCadastroComponent } from './servico-cadastro/servico-cadastro.component';
import { ServicoOcorrenciaComponent } from './servico-ocorrencia/servico-ocorrencia.component';
import { ServicoListagemGerenciaComponent } from './servico-listagem-gerencia/servico-listagem-gerencia.component';
import { ServicoListagemFuncionarioComponent } from './servico-listagem-funcionario/servico-listagem-funcionario.component';
import { QrCodeComponent } from './qr-code/qr-code.component';

const routes: Routes = [
  { path: 'qrcode', component: QrCodeComponent },
  { path: 'cadastro/:idSala', component: ServicoCadastroComponent },
  { path: 'listagem/funcionario', component: ServicoListagemFuncionarioComponent},
  { path: 'listagem/gerencia', component: ServicoListagemGerenciaComponent },
  { path: 'ocorrencia', component: ServicoOcorrenciaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicosRoutingModule {}
