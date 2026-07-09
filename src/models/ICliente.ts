export interface ICliente {
  id: number;
  nome: string;
  email: string;
  telefone: string | null;
  criado_em: Date;
  atualizado_em: Date;
}