import { StatusOcorrencia } from '../status-ocorrencia';
import { BaseSeletor } from './base.seletor';

export class OcorrenciaSeletor extends BaseSeletor {
  descricao: string;
  sala: string;
  categoria: string;
  status: StatusOcorrencia;
  dataInicio: Date;
  dataFim: Date;
}
