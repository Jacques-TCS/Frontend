import { SetorTemAtividade } from "./setor-tem-atividade";
import { TipoDeAmbiente } from "./tipo-de-ambiente";

export class Setor {
  id: number;
  nome: string;
  sigla: string;
  internacao: boolean
  tipoDeAmbiente: TipoDeAmbiente
  atividades: SetorTemAtividade[]
}
