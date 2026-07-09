import inquirer from 'inquirer';

export async function exibirMenuPrincipal(): Promise<void> {
    let continuar = true;

    while (continuar) {
        const resposta = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcao',
                message: 'BookStore Manager CLI - O que você deseja fazer?',
                choices: [
                    'Autores',
                    'Livros',
                    'Clientes',
                    'Emprestimo',
                    'Relatorios',
                    'Sair',
                ],
            },
        ]);

        switch (resposta.opcao) {
            case 'Autores':
                console.log('-> Menu de Autores (ainda não está implementado)');
                break;
            case 'Livros':
                console.log('-> Menu de Livros (ainda não está implementado)');
                break;
            case 'Clientes':
                console.log('-> Menu de Cliente (ainda não está implementado)');
                break;
            case 'Emprestimo':
                console.log('-> Menu de Emprestimo (ainda não está implementado)');
                break;
            case 'Relatorios':
                console.log('-> Menu de Relatorios (ainda não está implementado)');
                break;
            case 'Sair':
                continuar = false;
                console.log('-> Encerrando o sistema...');
                break;
        }
    }
}