import { AmbienteTemAtividade } from './ambienteTemAtividade';
import { Setor } from './setor';

export class Ambiente {
  id: number;
  descricao: string;
  setor: Setor;
  tipoDeAmbiente: number;
  atividades: AmbienteTemAtividade[];
}
