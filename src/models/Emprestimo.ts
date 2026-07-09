import { IEmprestimo } from "./IEmprestimo";

export class Emprestimo {
    public readonly id: number;
    public readonly fkLivro: number;
    public readonly fkCliente: number;
    public readonly dataEmprestimo: Date;
    public readonly dataDevolucaoPrevista: Date;
    public readonly dataDevolucaoReal: Date | null;
    public readonly status: string;
    public readonly criadoEm: Date;
    public readonly atualizaEm: Date;

    constructor (dados: IEmprestimo) {
        this.id = dados.id;
        this.fkLivro = dados.fk_livro;
        this.fkCliente = dados.fk_cliente;
        this.dataEmprestimo =  dados.data_emprestimo;
        this.dataDevolucaoPrevista = dados.data_devolucao_prevista;
        this.dataDevolucaoReal = dados.data_devolucao_real;
        this.status = dados.status;
        this.criadoEm = dados.criado_em;
        this.atualizaEm = dados.atualizado_em;
    }
}