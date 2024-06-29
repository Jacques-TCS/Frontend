import { Cargo } from '../cargo';
import { StatusUsuario } from '../status-usuario';
import { BaseSeletor } from './base.seletor';

export class UsuarioSeletor extends BaseSeletor {
  nome: string;
  cargo: Cargo;
  status: StatusUsuario;
  dataDesligamentoInicio: Date;
  dataDesligamentoFim: Date;
}
