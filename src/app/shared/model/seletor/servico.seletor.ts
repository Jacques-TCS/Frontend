import { Ocorrencia } from '../ocorrencia';
import { BaseSeletor } from './base.seletor';

export class ServicoSeletor extends BaseSeletor {
  sala: string;
  menorDataHoraInicio: Date;
  menorDataHoraFim: Date;
  maiorDataHoraInicio: Date;
  maiorDataHoraFim: Date;
  ocorrencia: Ocorrencia;
  cargo: string;
  usuario: string;
  atividade: string;
}
