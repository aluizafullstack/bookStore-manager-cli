import * as EmprestimoService from '../services/EmprestimoService';
import { ErroNãoEncontrado, ValidarErro } from '../utils/errors';
import { formatarDataHora, formatarDataOuTraco} from '../utils/formatters';

export async function registrarEmprestimo(fkLivro: number, fkCliente: number, diasParaDevolucao: number): Promise<void> {
    try {

        const emprestimo = await EmprestimoService.registrarEmprestimo(fkLivro, fkCliente, diasParaDevolucao);
        console.log(`Empréstimo registrado com sucesso! ID: ${emprestimo.id}`);

    } catch (erro) {
        if (erro instanceof ErroNãoEncontrado) {
            console.error (`Não encontrado: ${erro.message}`);
        } else if (erro instanceof ValidarErro) {
            console.error (`Dados invalidos: ${erro.message}`);
        } else {
            console.error (`Erro inesperado: ${(erro as Error).message}`);
        } 
    }
}

export async function listarEmprestimos(): Promise<void> {
    try {

        const emprestimos = await EmprestimoService.listarTodosEmprestimos();
        if (emprestimos.length === 0) {
            console.log('Nenhum empréstimo registrado.');
            return;
        }

        console.table (
            emprestimos.map(e => ({
                ID: e.id,
                LivroID: e.fkLivro,
                ClienteID: e.fkCliente,
                DataEmprestimo: formatarDataHora(e.dataEmprestimo),
                DevolucaoPrevista: formatarDataHora(e.dataDevolucaoPrevista),
                DevolucaoReal: formatarDataOuTraco(e.dataDevolucaoReal),
                Status: e.status,
            }))
        );

    } catch (erro) {
        if (erro instanceof ErroNãoEncontrado) {
            console.error (`Não encontrado: ${erro.message}`);
        } else if (erro instanceof ValidarErro) {
            console.error (`Dados invalidos: ${erro.message}`);
        } else {
            console.error (`Erro inesperado: ${(erro as Error).message}`);
        } 
    }
}

export async function listarEmprestimosAtivos(): Promise<void> {
    
    try {

        const emprestimos = await EmprestimoService.listarEmprestimosAtivos();
        if (emprestimos.length === 0) {
            console.log('Nenhum empréstimo ativo no momento.');
            return;
        }

        console.table(
            emprestimos.map((e) => ({
                ID: e.id,
                LivroID: e.fkLivro,
                ClienteID: e.fkCliente,
                DataEmprestimo: formatarDataHora(e.dataEmprestimo),
                DevolucaoPrevista: formatarDataHora(e.dataDevolucaoPrevista),
            }))
        );

    } catch (erro) {
        if (erro instanceof ErroNãoEncontrado) {
            console.error (`Não encontrado: ${erro.message}`);
        } else if (erro instanceof ValidarErro) {
            console.error (`Dados invalidos: ${erro.message}`);
        } else {
            console.error (`Erro inesperado: ${(erro as Error).message}`);
        } 
    }
}

export async function listarEmprestimosDoCliente(fkCliente: number): Promise<void> {
    
    try {

        const emprestimos = await EmprestimoService.listarEmprestimosDoCliente(fkCliente);
        if (emprestimos.length === 0) {
            console.log('O cliente informado não possui empréstimos registrados.');
            return;
        }

        console.table(
            emprestimos.map((e) => ({
                ID: e.id,
                LivroID: e.fkLivro,
                DataEmprestimo: formatarDataHora(e.dataEmprestimo),
                Status: e.status,
            }))
        );

    } catch (erro) {
        if (erro instanceof ErroNãoEncontrado) {
            console.error (`Não encontrado: ${erro.message}`);
        } else if (erro instanceof ValidarErro) {
            console.error (`Dados invalidos: ${erro.message}`);
        } else {
            console.error (`Erro inesperado: ${(erro as Error).message}`);
        } 
    }
}

export async function listarEmprestimosDoLivro(fkLivro: number): Promise<void> {
    
    try {

        const emprestimos = await EmprestimoService.listarEmprestimosDoLivro(fkLivro);
        if (emprestimos.length === 0) {
            console.log('O livro informado não possui empréstimos registrados.');
            return;
        }

        console.table(
            emprestimos.map((e) => ({
                ID: e.id,
                ClienteID: e.fkCliente,
                DataEmprestimo: formatarDataHora(e.dataEmprestimo),
                Status: e.status,
            }))
        );

    } catch (erro) {
        if (erro instanceof ErroNãoEncontrado) {
            console.error (`Não encontrado: ${erro.message}`);
        } else if (erro instanceof ValidarErro) {
            console.error (`Dados invalidos: ${erro.message}`);
        } else {
            console.error (`Erro inesperado: ${(erro as Error).message}`);
        } 
    }
}

export async function consultarEmprestimoPorId(id: number): Promise<void> {

    try {

        const e = await EmprestimoService.buscarEmprestimoPorId(id);

        console.table([
            {
                ID: e.id,
                LivroID: e.fkLivro,
                ClienteID: e.fkCliente,
                DataEmprestimo: formatarDataHora(e.dataEmprestimo),
                DevolucaoPrevista: formatarDataHora(e.dataDevolucaoPrevista),
                DevolucaoReal: formatarDataOuTraco(e.dataDevolucaoReal),
                Status: e.status,
            },
        ]);

    } catch (erro) {
        if (erro instanceof ErroNãoEncontrado) {
            console.error (`Não encontrado: ${erro.message}`);
        } else if (erro instanceof ValidarErro) {
            console.error (`Dados invalidos: ${erro.message}`);
        } else {
            console.error (`Erro inesperado: ${(erro as Error).message}`);
        } 
    }
}

export async function devolverLivro(id: number): Promise<void> {
    
    try {

        const emprestimo = await EmprestimoService.devolverLivro(id);
        console.log(`Devolução registrada com sucesso! Empréstimo ID: ${emprestimo.id}`);

    } catch (erro) {
        if (erro instanceof ErroNãoEncontrado) {
            console.error (`Não encontrado: ${erro.message}`);
        } else if (erro instanceof ValidarErro) {
            console.error (`Dados invalidos: ${erro.message}`);
        } else {
            console.error (`Erro inesperado: ${(erro as Error).message}`);
        } 
    }
}