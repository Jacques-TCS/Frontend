import { CategoriaDeOcorrencia } from './categoriaDeOcorrencia';
import { Servico } from './servico';

export class Ocorrencia {
  id: number;
  categoriaDeOcorrencia: CategoriaDeOcorrencia;
  servico: Servico;
  status: boolean;
  dataOcorrencia: Date;
}
