import { pool } from './database/connection';
import { exibirMenuPrincipal } from './menus/mainMenu';
import { ErroNãoEncontrado, ValidarErro } from './utils/errors';

async function iniciarAplicacao(): Promise<void> {
    try {

        await pool.query('SELECT NOW()');
        console.log('Conectado ao banco de dados com sucesso!\n');

        await exibirMenuPrincipal();
    } catch (erro) {
        if (erro instanceof ErroNãoEncontrado) {
            console.error (`Não encontrado: ${erro.message}`);
        } else if (erro instanceof ValidarErro) {
            console.error (`Dados invalidos: ${erro.message}`);
        } else {
            console.error (`Erro inesperado: ${(erro as Error).message}`);
        } 
        
    } finally {
        await pool.end();
    }
}

iniciarAplicacao();