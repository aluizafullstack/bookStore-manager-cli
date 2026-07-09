import { ILivro } from "./ILivro";

export class Livro {
    public readonly id: number;
    public readonly titulo: string;
    public readonly fk_autor: number;
    public readonly quantidade_total: number;
    public readonly quantidade_disponivel: number;
    public readonly criadoEm: Date;
    public readonly atualizaEm: Date;

    constructor (dados: ILivro) {
        this.id = dados.id;
        this.titulo = dados.titulo;
        this.fk_autor = dados.fk_autor;
        this.quantidade_total = dados.quantidade_total;
        this.quantidade_disponivel = dados.quantidade_disponivel;
        this.criadoEm = dados.criado_em;
        this.atualizaEm = dados.atualizado_em;
    }

}