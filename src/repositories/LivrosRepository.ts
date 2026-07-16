import { pool } from '../database/connection';
import { ILivro } from '../models/ILivro';

export async function inserirLivro (titulo: string, fkAutor: number, quantidadeTotal: number, quantidadeDisponivel: number): Promise<ILivro> {
    const sql = `
        INSERT INTO LIVROS (titulo, fk_autor, quantidade_total, quantidade_disponivel)
        VALUES ($1, $2, $3, $4)
        RETURNING *`; // O criado_em e o atualizado_em é preenchido pelo banco via DEFAULT CURRENT_TIMESTAMP 
    const resultado = await pool.query<ILivro> (sql, [titulo, fkAutor, quantidadeTotal, quantidadeDisponivel]);
    return resultado.rows[0];
}

export async function listarLivros (): Promise<ILivro[]> {
    const sql = `SELECT * FROM LIVROS ORDER BY titulo`;
    const resultado = await pool.query<ILivro> (sql);
    return resultado.rows;
}

export async function buscarLivroPorId (id: number): Promise<ILivro | null> {
    const sql = `SELECT * FROM LIVROS WHERE id = $1`;
    const resultado = await pool.query<ILivro> (sql, [id]);
    return resultado.rows[0] ?? null;
}

export async function buscarLivroPorTitulo (titulo: string): Promise<ILivro> {
    const sql = `SELECT * FROM LIVROS WHERE LOWER(titulo) LIKE LOWER($1) ORDER BY titulo`;
    const resultado = await pool.query<ILivro>(sql, [`%${titulo.trim()}%`]);
    return resultado.rows[0] ?? null;
}

export async function atulizarLivros (id: number, titulo: string, fkAutor: number, quantidadeTotal: number, quantidadeDisponivel: number): Promise<ILivro | null> {
    const sql = `
        UPDATE LIVROS
        SET titulo = $1,
            fk_autor = $2,
            quantidade_total = $3,
            quantidade_disponivel = $4,
            atualizado_em = CURRENT_TIMESTAMP
        WHERE id = $5
        RETURNING *`
    const resultado = await pool.query<ILivro> (sql, [titulo, fkAutor, quantidadeTotal, quantidadeDisponivel]);
    return resultado.rows[0] ?? null;
}

export async function removerLivroPorId (id:number): Promise<boolean> {
    const sql = `DELETE FROM LIVROS WHERE id = $1`;
    const resultado = await pool.query (sql, [id]);
    return (resultado.rowCount ?? 0) > 0;
}

export async function removerLivroPorTitulo (titulo:string): Promise<boolean> {
    const sql = `DELETE FROM LIVROS WHERE titulo = $1`;
    const resultado = await pool.query (sql, [titulo]);
    return (resultado.rowCount ?? 0) > 0;
}

export async function retirarQuantidadeDisponivel (id:number): Promise<void> {
    const sql = `
        UPDATE LIVROS
        SET quantidade_disponivel = quantidade_disponivel - 1,
            atualizado_em = CURRENT_TIMESTAMP
        WHERE id = $1`;
    await pool.query (sql, [id]);
}
export async function adicionarQuantidadeDisponivel (id:number): Promise<void> {
    const sql = `
        UPDATE LIVROS
        SET quantidade_disponivel = quantidade_disponivel + 1,
            atualizado_em = CURRENT_TIMESTAMP
        WHERE id = $1`;
    await pool.query (sql, [id]);
}