import { BaseSeletor } from './base.seletor';

export class OcorrenciaSeletor extends BaseSeletor {
  descricaoAmbiente: string;
  categoria: string;
  status: boolean;
  dataInicio: Date;
  dataFim: Date;
}
