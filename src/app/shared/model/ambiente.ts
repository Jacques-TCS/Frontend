import { AmbienteTemAtividade } from "./ambienteTemAtividade";
import { Setor } from "./setor";
import { TipoDeAmbiente } from "./tipo-de-ambiente";

export class Ambiente {
  id: number;
  descricao: string;
  setor: Setor;
  tipoDeAmbiente: TipoDeAmbiente
  atividades: AmbienteTemAtividade[]
}
