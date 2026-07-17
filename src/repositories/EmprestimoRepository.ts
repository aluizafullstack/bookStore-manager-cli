import { pool } from '../database/connection';
import { IEmprestimo } from '../models/IEmprestimo';

export async function inserirEmprestimo (fkLivro: number, fkCliente: number, dataEmprestimo: Date, dataDevolucaoPrevista: Date):Promise<IEmprestimo> {
    const sql = `
        INSERT INTO EMPRESTIMOS (fk_livro, fk_cliente, data_emprestimo, data_devolucao_prevista)
        VALUES ($1, $2, $3, $4)
        RETURNING*`;
    const resultado = await pool.query<IEmprestimo> (sql, [fkLivro, fkCliente, dataEmprestimo, dataDevolucaoPrevista]);
    return resultado.rows[0]; 
}

export async function listarEmprestimos(): Promise<IEmprestimo[]> {
    const sql = `SELECT * FROM EMPRESTIMOS ORDER BY data_emprestimo DESC`;
    const resultado = await pool.query<IEmprestimo>(sql);
    return resultado.rows;
}

export async function listarEmprestimosAtivos(): Promise<IEmprestimo[]> {
    const sql = `SELECT * FROM EMPRESTIMOS WHERE status = 'Ativo' ORDER BY data_emprestimo`;
    const resultado = await pool.query<IEmprestimo>(sql);
    return resultado.rows;
}

export async function buscarEmprestimosPorId (id: number): Promise<IEmprestimo | null> {
    const sql = `SELECT * FROM EMPRESTIMOS WHERE id = $1`;
    const resultado = await pool.query<IEmprestimo>(sql, [id]);
    return resultado.rows[0] ?? null;
}

export async function listarEmprestimoPorCliente (fkCliente: number): Promise<IEmprestimo[]> {
    const sql = `SELECT * FROM EMPRESTIMOS WHERE fk_cliente = $1 ORDER BY data_emprestimo DESC`;
    const resultado = await pool.query<IEmprestimo>(sql, [fkCliente]);
    return resultado.rows;
}

export async function listarEmprestimosPorLivro (fkLivro: number): Promise<IEmprestimo[]> {
    const sql = `SELECT * FROM EMPRESTIMOS WHERE fk_livro = $1 ORDER BY data_emprestimo DESC`;
    const resultado = await pool.query<IEmprestimo>(sql, [fkLivro]);
    return resultado.rows;
}

export async function registrarDevolucao (id: number, dataDevolucaoReal: Date): Promise<IEmprestimo | null> {
    const sql = `
        UPDATE EMPRESTIMOS
        SET status = 'Devolvido',
            data_devolucao_real = $1,
            atualizado_em = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *`;
    const resultado = await pool.query<IEmprestimo>(sql, [dataDevolucaoReal, id]);
    return resultado.rows[0] ?? null;
}