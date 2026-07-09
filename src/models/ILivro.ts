export interface ILivro {
  id: number;
  titulo: string;
  fk_autor: number;
  quantidade_total: number;
  quantidade_disponivel: number;
  criado_em: Date;
  atualizado_em: Date;
}