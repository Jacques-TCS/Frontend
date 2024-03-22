import { Afastamento } from './afastamento';

export class Usuario {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  dataNascimento: Date;
  email: string;
  ctps: string;
  nivelAcesso: string;
  cargo: string;
  matricula: string;
  senha: string;
  dataContratacao: Date;
  statusUsuario: string;
  afastamentos: Afastamento[];
  dataDesligamento: Date;
}
