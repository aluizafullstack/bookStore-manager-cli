import * as EmprestimoService from '../services/EmprestimoService';

export async function registrarEmprestimo(fkLivro: number, fkCliente: number, diasParaDevolucao: number): Promise<void> {
    try {

        const emprestimo = await EmprestimoService.registrarEmprestimo(fkLivro, fkCliente, diasParaDevolucao);
        console.log(`Empréstimo registrado com sucesso! ID: ${emprestimo.id}`);

    } catch (erro: any) {
        console.error(`Erro ao registrar empréstimo: ${erro.message}`);
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
                DataEmprestimo: e.dataEmprestimo.toLocaleDateString('pt-BR'),
                DevolucaoPrevista: e.dataDevolucaoPrevista.toLocaleDateString('pt-BR'),
                DevolucaoReal: e.dataDevolucaoReal ? e.dataDevolucaoReal.toLocaleDateString('pt-BR') : '-',
                Status: e.status,
            }))
        );

    } catch (erro: any) {
        console.error(`Erro ao listar empréstimos: ${erro.message}`);
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
                DataEmprestimo: e.dataEmprestimo.toLocaleDateString('pt-BR'),
                DevolucaoPrevista: e.dataDevolucaoPrevista.toLocaleDateString('pt-BR'),
            }))
        );

    } catch (erro: any) {
        console.error(`Erro ao listar empréstimos ativos: ${erro.message}`);
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
                DataEmprestimo: e.dataEmprestimo.toLocaleDateString('pt-BR'),
                DevolucaoPrevista: e.dataDevolucaoPrevista.toLocaleDateString('pt-BR'),
                DevolucaoReal: e.dataDevolucaoReal ? e.dataDevolucaoReal.toLocaleDateString('pt-BR') : '-',
                Status: e.status,
            },
        ]);

    } catch (erro: any) {
        console.error(`Erro ao listar empréstimos por ID: ${erro.message}`);
    }
}

export async function devolverLivro(id: number): Promise<void> {
    
    try {

        const emprestimo = await EmprestimoService.devolverLivro(id);
        console.log(`Devolução registrada com sucesso! Empréstimo ID: ${emprestimo.id}`);

    } catch (erro: any) {
        console.error(`Erro ao devolver empréstimo: ${erro.message}`);
    }
}