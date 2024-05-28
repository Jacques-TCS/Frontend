import { Ambiente } from '../ambiente';
import { Atividade } from '../atividade';
import { Cargo } from '../cargo';
import { Ocorrencia } from '../ocorrencia';
import { Usuario } from '../usuario';
import { BaseSeletor } from './base.seletor';

export class ServicoSeletor extends BaseSeletor {
  ambiente: Ambiente;
  menorDataHoraInicio: Date;
  menorDataHoraFim: Date;
  maiorDataHoraInicio: Date;
  maiorDataHoraFim: Date;
  ocorrencia: Ocorrencia;
  cargo: Cargo;
  usuario: Usuario;
  atividade: Atividade;
}
