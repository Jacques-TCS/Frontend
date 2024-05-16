import { Usuario } from './usuario';
import { Ambiente } from './ambiente';
import { Cronograma } from './cronograma';

export class Servico {
  id: number;
  ambiente: Ambiente;
  cronograma: Cronograma;
  usuario: Usuario;
  tipoDeLimpeza: number;
  dataHoraInicio: Date;
  dataHoraFim: Date;
}
