import { pool } from '../database/connection';
import * as Relatorio from '../models/IRelatorio';

export async function livrosDisponiveis(): Promise<Relatorio.ILivroDisponivel[]> {
    const sql = `
        SELECT l.titulo, a.nome AS autor, l.quantidade_disponivel
        FROM LIVROS l
        INNER JOIN AUTORES a ON a.id = l.fk_autor
        WHERE l.quantidade_disponivel > 0
        ORDER BY l.titulo`;
    const resultado = await pool.query<Relatorio.ILivroDisponivel> (sql);
    return resultado.rows;
}

export async function livrosEmprestados(): Promise<Relatorio.ILivroEmprestado[]> {
    const sql = `
        SELECT l.titulo, c.nome AS cliente, e.data_emprestimo, e.data_devolucao_prevista
        FROM EMPRESTIMOS e
        INNER JOIN LIVROS l ON l.id = e.fk_livro
        INNER JOIN CLIENTES c ON c.id = e.fk_cliente
        WHERE e.status = 'Ativo'
        ORDER BY e.data_emprestimo`;
    const resultado = await pool.query<Relatorio.ILivroEmprestado> (sql);
    return resultado.rows;
}

export async function livrosCadastradosPorAutor(): Promise<Relatorio.ILivrosPorAutor[]> {
    const sql = `
        SELECT a.nome AS autor, COUNT(l.id)::int AS total_livros
        FROM AUTORES a
        LEFT JOIN LIVROS l ON l.fk_autor = a.id
        GROUP BY a.id, a.nome
        ORDER BY total_livros DESC`;
    const resultado = await pool.query<Relatorio.ILivrosPorAutor> (sql);
    return resultado.rows;
}

export async function quantidadeEmprestimosPorLivro(): Promise<Relatorio.IEmprestimosPorLivro[]> {
    const sql = `
        SELECT l.titulo, COUNT(e.id)::int AS total_emprestimos
        FROM LIVROS l
        LEFT JOIN EMPRESTIMOS e ON e.fk_livro = l.id
        GROUP BY l.id, l.titulo
        ORDER BY total_emprestimos DESC`;
    const resultado = await pool.query<Relatorio.IEmprestimosPorLivro> (sql);
    return resultado.rows;    
}

export async function clientesComEmprestimosAtivos(): Promise<Relatorio.IClienteComAtivos[]> {
    const sql = `
        SELECT c.nome, COUNT(e.id)::int AS emprestimos_ativos
        FROM CLIENTES c
        INNER JOIN EMPRESTIMOS e ON e.fk_cliente = c.id
        WHERE e.status = 'Ativo'
        GROUP BY c.id, c.nome
        ORDER BY emprestimos_ativos DESC`;
    const resultado = await pool.query<Relatorio.IClienteComAtivos> (sql);
    return resultado.rows;
}

export async function topLivrosMaisEmprestados(limite: number = 5): Promise<Relatorio.ITopLivro[]> {
    const sql = `
        SELECT l.titulo, COUNT(e.id)::int AS total_emprestimos
        FROM LIVROS l
        INNER JOIN EMPRESTIMOS e ON e.fk_livro = l.id
        GROUP BY l.id, l.titulo
        ORDER BY total_emprestimos DESC
        LIMIT $1`;
    const resultado = await pool.query<Relatorio.ITopLivro> (sql, [limite]);
    return resultado.rows;
}

export async function livrosComTotalEmprestado(): Promise<Relatorio.ILivroComTotal[]> {
    const sql = `
        SELECT l.titulo,
            (SELECT COUNT(*)::int FROM EMPRESTIMOS e WHERE e.fk_livro = l.id) AS total_emprestado
        FROM LIVROS l
        ORDER BY total_emprestado DESC`;
    const resultado = await pool.query<Relatorio.ILivroComTotal> (sql);
    return resultado.rows;
}

export async function autoresComMaisDeUmLivro(): Promise<Relatorio.IAutorComVariosLivros[]> {
    const sql = `
        SELECT sub.autor_id, a.nome, sub.total_livros
        FROM (
            SELECT fk_autor AS autor_id, COUNT(*)::int AS total_livros
            FROM LIVROS
            GROUP BY fk_autor
        ) sub
        JOIN AUTORES a ON a.id = sub.autor_id
        WHERE sub.total_livros > 1
        ORDER BY sub.total_livros DESC`;
    const resultado = await pool.query<Relatorio.IAutorComVariosLivros> (sql);
    return resultado.rows;
}

export async function livrosJaEmprestados(): Promise<Relatorio.ILivroSimples[]> {
    const sql = `
        SELECT id, titulo FROM LIVROS
        WHERE id IN (SELECT DISTINCT fk_livro FROM EMPRESTIMOS)
        ORDER BY titulo`;
    const resultado = await pool.query<Relatorio.ILivroSimples> (sql);
    return resultado.rows;

}

export async function clientesQueNuncaEmprestaram(): Promise<Relatorio.IClienteSimples[]> {
    const sql = `
        SELECT id, nome FROM CLIENTES
        WHERE id NOT IN (SELECT fk_cliente FROM EMPRESTIMOS)
        ORDER BY nome`;
    const resultado = await pool.query<Relatorio.IClienteSimples> (sql);
    return resultado.rows;
}

export async function autoresComLivro(): Promise<Relatorio.IAutorSimples[]> {
    const sql = `
        SELECT a.id, a.nome FROM AUTORES a
        WHERE EXISTS (SELECT 1 FROM LIVROS l WHERE l.fk_autor = a.id)
        ORDER BY a.nome`;
    const resultado = await pool.query<Relatorio.IAutorSimples> (sql);
    return resultado.rows;
}

export async function autoresSemLivro(): Promise<Relatorio.IAutorSimples[]> {
    const sql = `
        SELECT a.id, a.nome FROM AUTORES a
        WHERE NOT EXISTS (SELECT 1 FROM LIVROS l WHERE l.fk_autor = a.id)
        ORDER BY a.nome`;
    const resultado = await pool.query<Relatorio.IAutorSimples> (sql);
    return resultado.rows;
}

export async function emprestimosAcimaDaMediaDoCliente(): Promise<Relatorio.IEmprestimoAcimaMedia[]> {
    const sql = `
        SELECT e.id, c.nome AS cliente,
            (e.data_devolucao_prevista - e.data_emprestimo)::int AS duracao_dias
        FROM EMPRESTIMOS e
        JOIN CLIENTES c ON c.id = e.fk_cliente
        WHERE (e.data_devolucao_prevista - e.data_emprestimo) > (
            SELECT AVG(e2.data_devolucao_prevista - e2.data_emprestimo)
            FROM EMPRESTIMOS e2
            WHERE e2.fk_cliente = e.fk_cliente
        )
        ORDER BY c.nome`;
    const resultado = await pool.query<Relatorio.IEmprestimoAcimaMedia> (sql);
    return resultado.rows;
}

export async function consolidadoPorCliente(): Promise<Relatorio.IConsolidadoCliente[]> {
    const sql = `
        WITH totais_cliente AS (
            SELECT fk_cliente, COUNT(*)::int AS total_emprestimos
            FROM EMPRESTIMOS
            GROUP BY fk_cliente
        )
        SELECT c.nome, COALESCE(t.total_emprestimos, 0) AS total_emprestimos
        FROM CLIENTES c
        LEFT JOIN totais_cliente t ON t.fk_cliente = c.id
        ORDER BY total_emprestimos DESC`;
    const resultado = await pool.query<Relatorio.IConsolidadoCliente> (sql);
    return resultado.rows;
}

export async function popularidadeLivrosPorAutor(): Promise<Relatorio.IPopularidadeLivro[]> {
    const sql = `
        WITH emprestimos_por_livro AS (
            SELECT fk_livro, COUNT(*)::int AS total
            FROM EMPRESTIMOS
            GROUP BY fk_livro
        ),
        livros_com_autor AS (
            SELECT l.titulo, a.nome AS autor, COALESCE(e.total, 0) AS total_emprestimos
            FROM LIVROS l
            JOIN AUTORES a ON a.id = l.fk_autor
            LEFT JOIN emprestimos_por_livro e ON e.fk_livro = l.id
        )
        SELECT * FROM livros_com_autor
        ORDER BY total_emprestimos DESC`;
    const resultado = await pool.query<Relatorio.IPopularidadeLivro> (sql);
    return resultado.rows;
}