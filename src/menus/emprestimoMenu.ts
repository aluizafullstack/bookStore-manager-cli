import inquirer from 'inquirer';
import * as EmprestimoController from '../controllers/EmprestimoController';
import * as LivroController from '../controllers/LivroController';
import * as ClienteController from '../controllers/ClienteController';

export async function exibirMenuEmprestimo(): Promise<void> {
    let voltar = false;

    while (!voltar) {
        const resposta = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcao',
                pageSize: 10,
                message: 'Menu de Autores',
                choices: ['Registrar Empréstimo', 'Devolver Livro', 'Listar Todos', 'Listar Ativos', 'Consultar por ID', 'Consultar por Cliente', 'Consultar por Livro', 'Voltar'],
            },
        ]);

        switch (resposta.opcao) {

            case 'Registrar Empréstimo': {

                // -- Mostra livros cadastrados antes de registrar--
                console.log('\nLivros cadastrados:');
                await LivroController.listarLivros();

                // -- Mostra clientes cadastrados antes de registrar--
                console.log('\nClientes cadastrados:');
                await ClienteController.listarClientes();

                const { continuar } = await inquirer.prompt([
                    { type: 'confirm', name: 'continuar', message: 'Deseja registrar um novo empréstimo?', default: true },
                ]);
                if (!continuar) {
                    console.log('Operação cancelada.\n');
                    break;
                }

                const dados = await inquirer.prompt([
                    { type: 'number', name: 'fkLivro', message: 'ID do livro:' },
                    { type: 'number', name: 'fkCliente', message: 'ID do cliente:' },
                    { type: 'number', name: 'diasParaDevolucao', message: 'Prazo para devolução (em dias):', default: 7 },
                ]);
                await EmprestimoController.registrarEmprestimo(dados.fkLivro, dados.fkCliente, dados.diasParaDevolucao);
                break;
            }

            case 'Devolver Livro': {

                // -- Mostra emprestimos de livros ativos cadastrados antes de devolver--
                console.log('\nEmpréstimos ativos:');
                await EmprestimoController.listarEmprestimosAtivos();

                const { continuar } = await inquirer.prompt([
                    { type: 'confirm', name: 'continuar', message: 'Deseja cadastrar uma devolução?', default: true },
                ]);
                if (!continuar) {
                    console.log('Operação cancelada.\n');
                    break;
                }

                const { id } = await inquirer.prompt([
                    { type: 'number', name: 'id', message: 'ID do empréstimo a devolver:' },
                ]);
                await EmprestimoController.devolverLivro(id);
                break;
            }

            case 'Listar Todos':
                await EmprestimoController.listarEmprestimos();
                break;
            
            case 'Listar Ativos':
                await EmprestimoController.listarEmprestimosAtivos();
                break;
            
            case 'Consultar por ID': {

                const { id } = await inquirer.prompt ([
                    { type: 'number', name: 'id', message: 'ID do empréstimo:' },
                ]);
                await EmprestimoController.consultarEmprestimoPorId(id);
                break;
            }

            case 'Consultar por Cliente': {

                const { fkCliente } = await inquirer.prompt ([
                    { type: 'number', name: 'fkCliente', message: 'ID do Cliente:' },
                ]);
                await EmprestimoController.listarEmprestimosDoCliente(fkCliente);
                break;
            }

            case 'Consultar por Livro': {

                const { fkLivro } = await inquirer.prompt ([
                    { type: 'number', name: 'fkLivro', message: 'ID do Livro:' },
                ]);
                await EmprestimoController.listarEmprestimosDoLivro(fkLivro);
                break;
            }

            case 'Voltar':
                voltar = true;
                break;
        }
    }
}