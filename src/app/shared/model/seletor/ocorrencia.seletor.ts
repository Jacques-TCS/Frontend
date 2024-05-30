import { BaseSeletor } from './base.seletor';

export class OcorrenciaSeletor extends BaseSeletor {
  descricao: string;
  sala: string;
  categoria: string;
  status: boolean;
  dataInicio: Date;
  dataFim: Date;
}
