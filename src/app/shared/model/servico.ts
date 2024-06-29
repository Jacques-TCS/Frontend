import { Usuario } from './usuario';
import { Ambiente } from './ambiente';
import { Cronograma } from './cronograma';
import { Ocorrencia } from './ocorrencia';
import { Atividade } from './atividade';
import { Turno } from './turno';

export class Servico {
  id: number;
  ambiente: Ambiente;
  cronograma: Cronograma;
  usuario?: Usuario;
  tipoDeLimpeza: number;
  dataProgramada: Date
  dataHoraInicio: Date;
  dataHoraFim: Date;
  atividades: Atividade[];
  ocorrencia: Ocorrencia[];
  turno?: Turno;
}
