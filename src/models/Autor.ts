import { IAutor } from './IAutor';

export class Autor {
  public readonly id: number;
  public readonly nome: string;
  public readonly nacionalidade: string | null;
  public readonly dataNascimento: Date | null;
  public readonly criadoEm: Date;
  public readonly atualizadoEm: Date;

  constructor(dados: IAutor) {
    this.id = dados.id;
    this.nome = dados.nome;
    this.nacionalidade = dados.nacionalidade;
    this.dataNascimento = dados.data_nascimento;
    this.criadoEm = dados.criado_em;
    this.atualizadoEm = dados.atualizado_em;
  }
}