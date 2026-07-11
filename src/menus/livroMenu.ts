import inquirer from "inquirer";
import * as LivroController from '../controllers/LivroController';
import * as AutorController from '../controllers/AutorController';

export async function exibirMenuLivro(): Promise<void> {

    let voltar = false;

    while (!voltar) {
        const resposta = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcao',
                pageSize: 10,
                message: 'Menu de Livros',
                choices: ['Cadastrar', 'Listar', 'Consultar por ID', 'Consultar por Titulo', 'Atualizar', 'Remover por ID', 'Remover por Titulo', 'Voltar' ],
            },
        ]);

        switch (resposta.opcao) {
            case 'Cadastrar': {

                 // -- Mostra a lista de autores cadastrados antes de cadastrar--
                console.log('\nAutores cadastrados:');
                await AutorController.listarAutores();

                const { continuar } = await inquirer.prompt ([
                    {type: 'confirm', name: 'continuar', message: 'Deseja cadastar um novo livro?', default: true },
                ])
                if (!continuar) {
                    console.log('Operação cancelada.\n');
                    break;
                }

                const dados = await inquirer.prompt ([
                    {type: 'input', name: 'titulo', message: 'Titulo do livro:' },
                    {type: 'number', name: 'fkAutor', message: 'ID do autor:' },
                    {type: 'number', name: 'quantidadeTotal', message: 'Quantidade de exemplares do livro:' },
                ]);
                await LivroController.cadastrarLivro(dados.titulo, dados.fkAutor, dados.quantidadeTotal);
                break;
            }

            case 'Listar':

                await LivroController.listarLivros();
                break;
            
            case 'Consultar por ID': {

                const { id } = await inquirer.prompt ([
                    {type: 'number', name: 'id', message: 'ID do livro'},
                ]);
                await LivroController.consultarLivroPorId(id);
                break;
            }

            case 'Consultar por Titulo': {

                const { titulo } = await inquirer.prompt ([
                    {type: 'input', name: 'titulo', message: 'Titulo do livro'},
                ]);
                await LivroController.consultarLivroPorTitulo(titulo);
                break;
            }

            case 'Atualizar': {

                // -- Mostra a lista de livros cadastrados antes de atualizar --
                console.log('\nLivros cadastrados:');
                await LivroController.listarLivros();

                const { continuar } = await inquirer.prompt ([
                    {type: 'confirm', name: 'continuar', message: 'Deseja atualizar um livro?', default: true },
                ])
                if (!continuar) {
                    console.log('Operação cancelada.\n');
                    break;
                }

                const dados = await inquirer.prompt ([
                    { type: 'number', name: 'id', message: 'ID do livro a atualizar:' },
                    { type: 'input', name: 'titulo', message: 'Novo título:' },
                    { type: 'number', name: 'fkAutor', message: 'Novo ID do autor:' },
                    { type: 'number', name: 'quantidadeTotal', message: 'Nova quantidade total:' },
                    { type: 'number', name: 'quantidadeDisponivel', message: 'Nova quantidade disponível:' },
                ]);
                await LivroController.atulizarDadosLivro (dados.id, dados.titulo, dados.fkAutor, dados.quantidadeTotal, dados.quantidadeDisponivel);
                break;
            }

            case 'Remover por ID': {

                // -- Mostra a lista de livros cadastrados antes de remover --
                console.log('\nLivros cadastrados:');
                await LivroController.listarLivros();

                const { continuar } = await inquirer.prompt ([
                    {type: 'confirm', name: 'continuar', message: 'Deseja remover um livro por ID', default: true },
                ])
                if (!continuar) {
                    console.log('Operação cancelada.\n');
                    break;
                }

                const { id } = await inquirer.prompt ([
                    {type: 'number', name: 'id', message: 'ID do livro que você deseja remover:' },
                ]);
                await LivroController.excluirLivroPorId(id);
                break;
            }

            case 'Remover por Titulo': {

                // -- Mostra a lista de livros cadastrados antes de remover --
                console.log('\nLivros cadastrados:');
                await LivroController.listarLivros();

                const { continuar } = await inquirer.prompt ([
                    {type: 'confirm', name: 'continuar', message: 'Deseja remover um livro por titulo?', default: true },
                ])
                if (!continuar) {
                    console.log('Operação cancelada.\n');
                    break;
                }

                const { titulo } = await inquirer.prompt ([
                    {type: 'number', name: 'id', message: 'Titulo do livro que você deseja remover:' },
                ]);
                await LivroController.excluirLivroPorTitulo(titulo);
                break;
            }

            case 'Voltar':
                voltar = true;
                break;
        }
    }
}