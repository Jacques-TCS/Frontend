import { Usuario } from './usuario';
import { Ambiente } from './ambiente';
import { Atividade } from './atividade';
import { Ocorrencia } from './ocorrencia';

export class Servico {
  id: number;
  ambiente: Ambiente;
  dataHoraInicio: Date;
  dataHoraFim: Date;
  usuario: Usuario;
  atividades: Atividade[];
  ocorrencia: Ocorrencia[];
}
