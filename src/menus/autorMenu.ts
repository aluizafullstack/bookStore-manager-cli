import inquirer from "inquirer";
import * as AutorController from '../controllers/AutorController';

export async function exibirMenuAutor(): Promise<void> {

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

                // -- Mostra a lista de autores cadastrados antes de cadastrar --
                console.log('\nAutores cadastrados:');
                await AutorController.listarAutores();

                const { continuar } = await inquirer.prompt([
                    { type: 'confirm', name: 'continuar', message: 'Deseja cadastrar um novo autor?', default: true },
                ]);
                if (!continuar) {
                    console.log('Operação cancelada.\n');
                    break;
                }

                const dados = await inquirer.prompt ([
                    {type: 'input', name: 'nome', message: 'Nome do Autor:' },
                    {type: 'input', name: 'nacionalidade', message: 'Nacionalidade (opcional):' },
                    {type: 'input', name: 'dataNascimento', message: 'Data de nascimento (AAAA-MM-DD), opcional): '},
                ]);
                await AutorController.cadastrarAutor (dados.nome, dados.nacionalidade || null, dados.dataNascimento ? new Date(dados.dataNascimento): null);
                break;
            }

            case 'Listar':
                await AutorController.listarAutores ();
                break;
            
            case 'Consultar por ID': {
                const { id } = await inquirer.prompt([
                    { type: 'number', name: 'id', message: 'ID do autor:' },
                ]);
                await AutorController.consultarAutorPorId(id);
                break;
            }

            case 'Consultar por Nome': {
                const { nome } = await inquirer.prompt([
                    { type: 'input', name: 'nome', message: 'Nome do autor:' },
                ]);
                await AutorController.consultarAutorPorNome(nome);
                break;
            }

            case 'Atualizar': {

                // -- Mostra a lista de autores cadastrados antes de atualizar --
                console.log('\nAutores cadastrados:');
                await AutorController.listarAutores();

                const { continuar } = await inquirer.prompt([
                    { type: 'confirm', name: 'continuar', message: 'Deseja atualizar um autor?', default: true },
                ]);
                if (!continuar) {
                    console.log('Operação cancelada.\n');
                    break;
                }

                const dados = await inquirer.prompt ([
                    {type: 'number', name: 'id', message: 'ID do autor que você quer atualizar:' },
                    {type: 'input', name: 'nome', message: 'Novo nome:' },
                    {type: 'input', name: 'nacionalidade', message: 'Nova nacionalidade (opcional):' },
                    {type: 'input', name: 'dataNascimento', message: 'Nova data de nascimento (AAAA-MM-DD, opcional):' },
                ]);
                await AutorController.atualizarAutor(dados.id, dados.nome, dados.nacionalidade || null, dados.dataNascimento ? new Date(dados.dataNascimento): null);
                break;
            }

            case 'Remover por ID': {

                // -- Mostra a lista de autores cadastrados antes de removerr --
                console.log('\nAutores cadastrados:');
                await AutorController.listarAutores();

                const { continuar } = await inquirer.prompt([
                    { type: 'confirm', name: 'continuar', message: 'Deseja remover um autor por ID?', default: false },
                ]);
                if (!continuar) {
                    console.log('Operação cancelada.\n');
                    break;
                }

                const { id } = await inquirer.prompt([
                    { type: 'number', name: 'id', message: 'ID do autor que você quer removes:' },
                ]);
                await AutorController.excluirAutorPorId(id);
                break;
            }

            case 'Remover por Nome': {

                // -- Mostra a lista de autores cadastrados antes de removerr --
                console.log('\nAutores cadastrados:');
                await AutorController.listarAutores();

                const { continuar } = await inquirer.prompt([
                    { type: 'confirm', name: 'continuar', message: 'Deseja remover um autor por Nome?', default: false },
                ]);
                if (!continuar) {
                    console.log('Operação cancelada.\n');
                    break;
                }

                const { nome } = await inquirer.prompt([
                    { type: 'input', name: 'nome', message: 'Nome do autor que você quer remover:' },
                ]);
                await AutorController.excluirAutorPorNome(nome);
                break;
            }

            case 'Voltar':
                console.log('Voltando para o menu principal...');
                voltar = true;
                break;
        }
    }
}