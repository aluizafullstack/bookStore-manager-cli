export interface IAutor {
    id: number;
    nome: string;
    nacionalidade: string | null;
    data_nascimento: Date | null;
    criado_em: Date;
    atualizado_em: Date;
}