import { Atividade } from "./atividade";
import { Setor } from "./setor";
import { TipoDeAmbiente } from "./tipo-de-ambiente";

export class SetorTemAtividade {
  id: number;
  setor: Setor;
  atividade: Atividade;
}
