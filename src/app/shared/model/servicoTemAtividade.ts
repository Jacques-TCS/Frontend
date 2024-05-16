import { Atividade } from './atividade';
import { Servico } from './servico';

export class ServicoTemAtividades {
  id: number;
  servico: Servico;
  atividade: Atividade;
}
