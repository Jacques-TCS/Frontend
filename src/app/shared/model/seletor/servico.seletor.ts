import { Ambiente } from '../ambiente';
import { Atividade } from '../atividade';
import { Cargo } from '../cargo';
import { Ocorrencia } from '../ocorrencia';
import { TipoDeLimpeza } from '../tipoDeLimpeza';
import { Usuario } from '../usuario';
import { BaseSeletor } from './base.seletor';

export class ServicoSeletor extends BaseSeletor {
  ambiente: string;
  setor: string;
  dataEncerramentoInicio: Date;
  dataEncerramentoFim: Date;
  dataProgramadaInicio: Date;
  dataProgramadaFim: Date;
  statusOcorrencia: boolean;
  cargo: Cargo;
  usuario?: Usuario;
  atividade: Atividade;
  tipoDeLimpeza: TipoDeLimpeza;
}
