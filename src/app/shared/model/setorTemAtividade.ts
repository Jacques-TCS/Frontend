import { Atividade } from './atividade';
import { Setor } from './setor';

export class SetorTemAtividade {
  id: number;
  setor: Setor;
  atividade: Atividade;
  turno: string;
  frequencia: number;
  tipoDeLimpeza: number;
}
