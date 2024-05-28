import { Usuario } from './usuario';

export class Afastamento {
  id: number;
  natureza: string;
  usuario: Usuario;
  dataInicio: Date;
  dataFim: Date;
  descricao: string;
}
