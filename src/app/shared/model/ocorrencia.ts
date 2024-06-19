import { Categoria } from './categoria';
import { Servico } from './servico';

export class Ocorrencia {
  id: number;
  categoria: Categoria;
  descricao: string;
  servico: Servico;
  status: boolean;
  dataOcorrencia: Date;
}
