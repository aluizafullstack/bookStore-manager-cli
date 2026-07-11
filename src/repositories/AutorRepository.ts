import { pool } from '../database/connection';
import { IAutor } from '../models/IAutor';

export async function inserirAutor (nome: string, nacionalidade: string | null, dataNascimento: Date | null): Promise<IAutor> {
    const sql = `
        INSERT INTO AUTORES (nome, nacionalidade, data_nascimento)
        VALUES ($1, $2, $3)
        RETURNING *`; // O criado_em e o atualizado_em é preenchido pelo banco via DEFAULT CURRENT_TIMESTAMP 
    const resultado = await pool.query<IAutor> (sql, [nome, nacionalidade, dataNascimento]);
    return resultado.rows[0];
}

export async function listarAutores (): Promise<IAutor[]> {
    const sql = `SELECT * FROM AUTORES ORDER BY nome`;
    const resultado = await pool.query<IAutor> (sql);
    return resultado.rows;
}

export async function buscarAutorPorId (id: number): Promise<IAutor | null> {
    const sql = `SELECT * FROM AUTORES WHERE id = $1`;
    const resultado = await pool.query<IAutor> (sql, [id]);
    return resultado.rows[0] ?? null;
}

export async function buscarAutorPorNome (nome: string) {
    const sql = ` SELECT * FROM AUTORES WHERE nome = $1`;
    const resultado = await pool.query<IAutor> (sql, [nome]);
    return resultado.rows[0] ?? null;
}

export async function atualizarAutor (id: number, nome: string, nacionalidade: string | null, dataNascimento: Date | null): Promise<IAutor | null> {
    const sql = `
        UPDATE AUTORES
        SET nome = $1,
            nacionalidade = $2,
            data_nascimento = $3,
            atualiza_em = CORRENT_TIMESTAMP
        WHERE id = $4
        RETURNING *`
    const resultado = await pool.query<IAutor> (sql, [nome,nacionalidade, dataNascimento, id]);
    return resultado.rows[0] ?? null;
}

export async function removerAutorPorId (id: number): Promise<boolean> {
    const sql = `DELETE FROM AUTORES WHERE id = $1`;
    const resultado = await pool.query (sql, [id]);
    return (resultado.rowCount ?? 0) > 0;
}

export async function removerAutorPorNome (nome: string): Promise<boolean> {
    const sql = `DELETE FROM AUTORES WHERE nome = $1`;
    const resultado = await pool.query (sql, [nome]);
    return (resultado.rowCount ?? 0) > 0;
}