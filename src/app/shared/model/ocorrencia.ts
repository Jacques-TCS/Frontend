import { Servico } from './servico';

export class Ocorrencia {
  id: number;
  descricao: string;
  servico: Servico;
  status: boolean;
  dataOcorrencia: Date;
}
