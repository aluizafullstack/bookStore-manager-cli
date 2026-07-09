import { ICliente } from './ICliente';

export class Cliente {
    public readonly id: number;
    public readonly nome: string;
    public readonly email: string;
    public readonly telefone: string | null;
    public readonly criadoEm: Date;
    public readonly atualizadoEm: Date;

    constructor (dados: ICliente) {
        this.id = dados.id;
        this.nome = dados.nome;
        this.email = dados.email;
        this.telefone = dados.telefone;
        this.criadoEm = dados.criado_em;
        this.atualizadoEm = dados.atualizado_em;
    }
}