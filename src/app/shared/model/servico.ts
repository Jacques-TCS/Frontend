import { Usuario } from './usuario';
import { Ambiente } from './ambiente';
import { Cronograma } from './cronograma';
import { Ocorrencia } from './ocorrencia';

export class Servico {
  id: number;
  ambiente: Ambiente;
  cronograma: Cronograma;
  usuario: Usuario;
  tipoDeLimpeza: number;
  dataHoraInicio: Date;
  dataHoraFim: Date;
  ocorrencia: Ocorrencia[];
}
