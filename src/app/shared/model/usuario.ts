import { Afastamento } from './afastamento';
import { Cargo } from './cargo';

export class Usuario {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  dataNascimento: Date;
  email: string;
  cargo: Cargo;
  username: string;
  password: string;
  status: string;
  motivoAfastamento: string;
  dataDesligamento: Date;
}
