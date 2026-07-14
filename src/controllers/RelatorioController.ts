import * as RelatorioRepository from '../repositories/RelatorioRepository';
import { ErroNãoEncontrado, ValidarErro } from '../utils/errors';

export async function exibirLivrosDisponiveis(): Promise<void> {
    
    try {

        const relatorio = await RelatorioRepository.livrosDisponiveis();
        if (relatorio.length === 0) {
            console.log('Nenhum livro disponível no momento.');
            return;
        }

        console.table (
            relatorio.map((r) => ({
                Titulo: r.titulo,
                Autor: r.autor,
                Disponivel: r.quantidade_disponivel
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

export async function exibirLivrosEmprestados(): Promise<void> {

    try {

        const relatorio = await RelatorioRepository.livrosEmprestados();
        if (relatorio.length === 0) {
            console.log('Nenhum livro emprestado no momento.');
            return;
        }

        console.table (
            relatorio.map((r) => ({
                Titulo: r.titulo,
                Cliente: r.cliente,
                DataDevolucao: new Date(r.data_emprestimo).toLocaleDateString('pt-BR'),
                DevolucaoPrevista: new Date(r.data_devolucao_prevista).toLocaleDateString('pt-BR')
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

export async function exibirLivrosCadastradosPorAutor(): Promise<void> {

    try {

        const relatorio = await RelatorioRepository.livrosCadastradosPorAutor();

        console.table (
            relatorio.map((r) => ({
                Autor: r.autor,
                TotalLivros: r.total_livros
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

export async function exibirQuantidadeEmprestimosPorLivro(): Promise<void> {

    try {

        const relatorio = await RelatorioRepository.quantidadeEmprestimosPorLivro();

        console.table (
            relatorio.map((r) => ({
                Titulo: r.titulo,
                TotalEmprestimos: r.total_emprestimos
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

export async function exibirClientesComEmprestimosAtivos(): Promise<void> {

    try {

        const relatorio = await RelatorioRepository.clientesComEmprestimosAtivos();
        if (relatorio.length === 0) {
            console.log('Nenhum cliente com empréstimos ativos no momento.');
            return;
        }

        console.table (
            relatorio.map((r) => ({
                Cliete: r.nome,
                EmprestimosAtivos: r.emprestimos_ativos
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

export async function exibirTopLivros(): Promise<void> {

    try {

        const relatorio = await RelatorioRepository.topLivrosMaisEmprestados(5);
        if (relatorio.length === 0) {
            console.log('Nenhum livro foi emprestado ainda.');
            return;
        }

        console.table (
            relatorio.map((r, indice) => ({
                Posicao: indice + 1,
                Titulo: r.titulo,
                VezesEmprestado: r.total_emprestimos
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

export async function exibirLivrosComTotalEmprestado(): Promise<void> {

    try {

        const relatorio = await RelatorioRepository.livrosComTotalEmprestado();
        
        console.table (
            relatorio.map(r => ({
                Titulo: r.titulo,
                VezesEmprestado: r.total_emprestado
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

export async function exibirAutoresComMaisDeUmLivro(): Promise<void> {

    try {
    
        const relatorio = await RelatorioRepository.autoresComMaisDeUmLivro();
        if (relatorio.length === 0) {
            console.log('Nenhum autor tem mais de 1 livro cadastrado.');
            return;
        }

        console.table (
            relatorio.map(r => ({
                Autor: r.nome,
                TotalLivros: r.total_livros
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

export async function exibirLivrosJaEmprestados(): Promise<void> {

    try {

        const relatorio = await RelatorioRepository.livrosJaEmprestados();
        if (relatorio.length === 0) {
            console.log('Nenhum livro foi emprestado ainda.');
            return;
        }

        console.table (
            relatorio.map(r => ({
                ID: r.id,
                Titulo: r.titulo
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

export async function exibirClientesQueNuncaEmprestaram(): Promise<void> {

    try {

        const relatorio = await RelatorioRepository.clientesQueNuncaEmprestaram();
        if (relatorio.length === 0) {
            console.log('Todos os clientes já realizaram pelo menos um empréstimo.');
            return;
        }

        console.table (
            relatorio.map(r => ({
                ID: r.id,
                Nome: r.nome
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

export async function exibirAutoresComLivro(): Promise<void> {

    try {

        const relatorio = await RelatorioRepository.autoresComLivro();

        console.table (
            relatorio.map(r => ({
                ID: r.id,
                Nome: r.nome
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

export async function exibirAutoresSemLivro(): Promise<void> {

    try {

        const relatorio = await RelatorioRepository.autoresSemLivro();
        if (relatorio.length === 0) {
            console.log('Todos os autores já têm pelo menos um livro cadastrado.');
            return;
        }

        console.table (
            relatorio.map(r => ({
                ID: r.id,
                Nome: r.nome
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

export async function exibirEmprestimosAcimaDaMedia(): Promise<void> {

    try {

        const relatorio = await RelatorioRepository.emprestimosAcimaDaMediaDoCliente();
        if (relatorio.length === 0) {
            console.log('Nenhum empréstimo acima da média do próprio cliente.');
            return;
        }

        console.table (
            relatorio.map(r => ({
                ID: r.id,
                Cliente: r.cliente,
                DuracaoDias: r.duracao_dias
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

export async function exibirConsolidadoPorCliente(): Promise<void> {

    try {

        const relatorio = await RelatorioRepository.consolidadoPorCliente();
        console.table (
            relatorio.map(r => ({
                Cliente: r.nome,
                TotalEmpréstimos: r.total_emprestimos
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

export async function exibirPopularidadePorAutor(): Promise<void> {

    try {

        const relatorio = await RelatorioRepository.popularidadeLivrosPorAutor();
        console.table (
            relatorio.map(r => ({
                Título: r.titulo,
                Autor: r.autor,
                TotalEmpréstimos: r.total_emprestimos
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