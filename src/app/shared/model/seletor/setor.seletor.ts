import { Atividade } from "../atividade";
import { BaseSeletor } from "./base.seletor";

export class SetorSeletor extends BaseSeletor {
    public nome: string;
    public sigla: string;
    public atividade: Atividade;
}