export interface IEmprestimo {
  id: number;
  fk_livro: number;
  fk_cliente: number;
  data_emprestimo: Date;
  data_devolucao_prevista: Date;
  data_devolucao_real: Date | null;
  status: string;
  criado_em: Date;
  atualizado_em: Date;
}