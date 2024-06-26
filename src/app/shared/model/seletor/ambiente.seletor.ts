import { Atividade } from '../atividade';
import { Setor } from '../setor';
import { BaseSeletor } from './base.seletor';

export class AmbienteSeletor extends BaseSeletor {
  nome: string;
  setor: string;
  atividade: Atividade;
}
