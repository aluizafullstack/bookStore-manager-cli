import { pool } from '../database/connection';
import { ICliente } from '../models/ICliente';

export async function inserirCliente (nome: string, email: string, telefone: string | null): Promise<ICliente> {
    const sql = `
        INSERT INTO CLIENTES (nome, email, telefone)
        VALUES ($1, $2, $3)
        RETURNING *`; // O criado_em e o atualizado_em é preenchido pelo banco via DEFAULT CURRENT_TIMESTAMP
        const resultado = await pool.query<ICliente> (sql, [nome, email, telefone]);
        return resultado.rows[0]; 
}

export async function listarClientes (): Promise<ICliente[]> {
    const sql = `SELECT * FROM CLIENTES ORDER BY nome`;
    const resultado = await pool.query<ICliente> (sql);
    return resultado.rows;
}

export async function buscarClientePorId (id:number): Promise<ICliente | null> {
    const sql = `SELECT * FROM CLIENTES WHERE id = $1`;
    const resultado = await pool.query<ICliente> (sql, [id]);
    return resultado.rows[0] ?? null;
}

export async function buscarClientePorNome (nome:string): Promise<ICliente | null> {
    const sql = `SELECT * FROM CLIENTES WHERE LOWER(nome) = LOWER($1)`;
    const resultado = await pool.query<ICliente> (sql, [nome]);
    return resultado.rows[0] ?? null;
}

export async function buscarClientePorEmail (email:string): Promise<ICliente | null> {
    const sql = `SELECT * FROM CLIENTES WHERE LOWER(email) = LOWER($1)`;
    const resultado = await pool.query<ICliente> (sql, [email]);
    return resultado.rows[0] ?? null;
}

export async function atualizarCliente (id:number, nome: string, email: string, telefone: string | null): Promise<ICliente | null> {
    const sql = `
        UPDATE CLIENTES
        SET nome = $1,
            email = $2,
            telefone = $3,
            atualizado_em = CORRENT_TIMESTAMP
        WHERE id = $4
        RETURNING *`
    const resultado = await pool.query<ICliente> (sql, [nome, email, telefone, id]);
    return resultado.rows[0] ?? null;
}

export async function removerClientePorId (id: number): Promise<boolean> {
    const sql = `DELETE FROM CLIENTES WHERE id = $1`;
    const resultado = await pool.query (sql, [id]);
    return (resultado.rowCount ?? 0) > 0;
}

export async function removerClientePorNome (nome: string): Promise<boolean> {
    const sql = `DELETE FROM CLIENTES WHERE nome = $1`;
    const resultado = await pool.query (sql, [nome]);
    return (resultado.rowCount ?? 0) > 0;
}