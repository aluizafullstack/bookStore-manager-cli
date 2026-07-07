import { pool } from './database/connection';

async function testarConexao() {
  const resultado = await pool.query('SELECT NOW()');
  console.log(resultado.rows[0]);
}

testarConexao();