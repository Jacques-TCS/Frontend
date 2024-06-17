import { SetorTemAtividade } from "./setorTemAtividade";
import { TipoDeAmbiente } from "./tipo-de-ambiente";

export class Setor {
  id: number;
  nome: string;
  sigla: string;
  atividades: SetorTemAtividade[]
}
