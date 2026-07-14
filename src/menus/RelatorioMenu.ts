import inquirer from 'inquirer';
import * as RelatorioController from '../controllers/RelatorioController';

export async function exibirMenuRelatorio(): Promise<void> {
    let voltar = false;

    while (!voltar) {
        const resposta = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcao',
                pageSize: 20,
                message: 'Menu de Relatórios',
                choices: ['Livros Disponíveis', 'Livros Emprestados', 'Livros Cadastrados por Autor', 'Quantidade de Empréstimos por Livro','Clientes com Empréstimos Ativos', 'Top 5 Livros Mais Emprestados', 'Livros com Total Emprestado', 'Autores com Mais de 1 Livro', 'Livros Já Emprestados', 'Clientes que Nunca Emprestaram','Autores com Livro', 'Autores sem Livro', 'Empréstimos Acima da Média', 'Consolidado por Cliente', 'Popularidade por Autor', 'Voltar',
                ],
            },
        ]);

        switch (resposta.opcao) {
            case 'Livros Disponíveis':
                await RelatorioController.exibirLivrosDisponiveis();
                break;
            
            case 'Livros Emprestados':
                await RelatorioController.exibirLivrosEmprestados();
                break;

            case 'Livros Cadastrados por Autor':
                await RelatorioController.exibirLivrosCadastradosPorAutor();
                break;

            case 'Quantidade de Empréstimos por Livro':
                await RelatorioController.exibirQuantidadeEmprestimosPorLivro();
                break;

            case 'Clientes com Empréstimos Ativos':
                await RelatorioController.exibirClientesComEmprestimosAtivos();
                break;

            case 'Top 5 Livros Mais Emprestados':
                await RelatorioController.exibirTopLivros();
                break;

            case 'Livros com Total Emprestado':
                await RelatorioController.exibirLivrosComTotalEmprestado();
                break;

            case 'Autores com Mais de 1 Livro':
                await RelatorioController.exibirAutoresComMaisDeUmLivro();
                break;

            case 'Livros Já Emprestados':
                await RelatorioController.exibirLivrosJaEmprestados();
                break;

            case 'Clientes que Nunca Emprestaram':
                await RelatorioController.exibirClientesQueNuncaEmprestaram();
                break;

            case 'Autores com Livro':
                await RelatorioController.exibirAutoresComLivro();
                break;

            case 'Autores sem Livro':
                await RelatorioController.exibirAutoresSemLivro();
                break;

            case 'Empréstimos Acima da Média':
                await RelatorioController.exibirEmprestimosAcimaDaMedia();
                break;

            case 'Consolidado por Cliente':
                await RelatorioController.exibirConsolidadoPorCliente();
                break;

            case 'Popularidade por Autor':
                await RelatorioController.exibirPopularidadePorAutor();
                break;

            case 'Voltar':
                voltar = true;
                break;
            
        }
    }
}