import { Cargo } from './cargo';
import { StatusUsuario } from './status-usuario';

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
  status: StatusUsuario;
  motivoAfastamento: string;
  dataDesligamento: Date;
}
