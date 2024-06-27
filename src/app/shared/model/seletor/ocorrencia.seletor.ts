import { Categoria } from '../categoria';
import { BaseSeletor } from './base.seletor';

export class OcorrenciaSeletor extends BaseSeletor {
  descricaoAmbiente: string;
  categoria: Categoria;
  status: boolean;
  dataInicio: Date;
  dataFim: Date;
}
