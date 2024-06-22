import { Atividade } from '../atividade';
import { Setor } from '../setor';
import { BaseSeletor } from './base.seletor';

export class AmbienteSeletor extends BaseSeletor {
  descricao: string;
  setor: Setor;
  atividades: Atividade[];
}
