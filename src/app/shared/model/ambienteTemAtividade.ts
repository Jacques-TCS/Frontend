import { Ambiente } from './ambiente';
import { Atividade } from './atividade';

export class AmbienteTemAtividade {
  id: number;
  ambiente: Ambiente;
  atividade: Atividade;
  turno: string;
  frequencia: number;
  tipoDeLimpeza: number;
}
