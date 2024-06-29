import { Usuario } from './usuario';
import { Ambiente } from './ambiente';
import { Cronograma } from './cronograma';
import { Ocorrencia } from './ocorrencia';
import { Atividade } from './atividade';
import { Turno } from './turno';
import { TipoDeLimpeza } from './tipoDeLimpeza';

export class Servico {
  id: number;
  ambiente: Ambiente;
  cronograma: Cronograma;
  usuario?: Usuario;
  tipoDeLimpeza: TipoDeLimpeza;
  dataProgramada: Date
  dataHoraInicio: Date;
  dataHoraFim: Date;
  atividades: Atividade[];
  ocorrencia: Ocorrencia[];
  turno?: Turno;
}
