import inquirer from 'inquirer';
import * as ClienteController from '../controllers/ClienteController';

export async function exibirMenuCliente(): Promise<void> {
    let voltar = false;

    while (!voltar) {
        const resposta = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcao',
                pageSize: 10,
                message: 'Menu de Autores',
                choices: ['Cadastrar', 'Listar', 'Consultar por ID', 'Consultar por Nome', 'Atualizar', 'Remover por ID', 'Remover por Nome', 'Voltar'],
            },
        ]);

        switch (resposta.opcao) {
            case 'Cadastrar': {

                // -- Mostra a lista de clientes cadastrados antes de cadastrar --
                console.log('\nClientes cadastrados:');
                await ClienteController.listarClientes();

                const { continuar } = await inquirer.prompt([
                    { type: 'confirm', name: 'continuar', message: 'Deseja cadastrar um novo autor?', default: true },
                ]);
                if (!continuar) {
                    console.log('Operação cancelada.\n');
                    break;
                }

                const dados = await inquirer.prompt ([
                    {type: 'input', name: 'nome', message: 'Nome do Cliente:' },
                    {type: 'input', name: 'email', message: 'E-mail do Cliente:' },
                    {type: 'input', name: 'telefone', message: 'Telefone do cliente (Opcional):' },
                ]);
                await ClienteController.cadastrarCliente(dados.nome, dados.email, dados.telefone || null);
                break;
            }

            case 'Listar':
                await ClienteController.listarClientes();
                break;
            
            case 'Consultar por ID': {
                const { id } = await inquirer.prompt ([
                    {type: 'number', name: 'id', message: 'ID do Cliente:' }
                ]);
                await ClienteController.consultarClientePorId(id);
                break;
            }

            case 'Consultar por Nome': {
                const { nome } = await inquirer.prompt ([
                    {type: 'input', name: 'nome', message: 'Nome do Cliente:' }
                ]);
                await ClienteController.consultarClientePorNome(nome);
                break;
            }

            case 'Atualizar': {

                // -- Mostra a lista de clientes cadastrados antes de atualizar --
                console.log('\nClientes cadastrados:');
                await ClienteController.listarClientes();

                const { continuar } = await inquirer.prompt([
                    { type: 'confirm', name: 'continuar', message: 'Deseja cadastrar um novo autor?', default: true },
                ]);
                if (!continuar) {
                    console.log('Operação cancelada.\n');
                    break;
                }

                const dados = await inquirer.prompt ([
                    {type: 'number', name: 'id', message: 'ID do Cliente:' },
                    {type: 'input', name: 'nome', message: 'Nome do Cliente:' },
                    {type: 'input', name: 'email', message: 'E-mail do Cliente:' },
                    {type: 'input', name: 'telefone', message: 'Telefone do cliente (Opcional):' },
                ]);
                await ClienteController.atualizarCliente (dados.id, dados.nome, dados.email, dados.telefone || null);
                break;
            }

            case 'Remover por ID': {

                // -- Mostra a lista de clientes cadastrados antes de remover --
                console.log('\nClientes cadastrados:');
                await ClienteController.listarClientes();

                const { continuar } = await inquirer.prompt([
                    { type: 'confirm', name: 'continuar', message: 'Deseja cadastrar um novo autor?', default: true },
                ]);
                if (!continuar) {
                    console.log('Operação cancelada.\n');
                    break;
                }

                const { id } = await inquirer.prompt ([
                    {type: 'number', name: 'id', message: 'ID do Cliente:' },
                ]);
                await ClienteController.excluirClientePorId(id);
                break;
            }

            case 'Remover por Nome': {

                // -- Mostra a lista de clientes cadastrados antes de remover --
                console.log('\nClientes cadastrados:');
                await ClienteController.listarClientes();

                const { continuar } = await inquirer.prompt([
                    { type: 'confirm', name: 'continuar', message: 'Deseja cadastrar um novo autor?', default: true },
                ]);
                if (!continuar) {
                    console.log('Operação cancelada.\n');
                    break;
                }

                const { nome } = await inquirer.prompt ([
                    {type: 'input', name: 'nome', message: 'Nome do Cliente:' },
                ]);
                await ClienteController.excluirClientePorNome(nome);
                break;
            }

            case 'Voltar':
                console.log('Voltando para o menu principal...');
                voltar = true;
                break;
        }
    }
}