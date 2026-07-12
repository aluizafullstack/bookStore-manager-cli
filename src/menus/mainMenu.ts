import inquirer from 'inquirer';
import { exibirMenuAutor } from './autorMenu';
import { exibirMenuLivro } from './livroMenu';
import { exibirMenuCliente } from './cliente.Menu';

export async function exibirMenuPrincipal(): Promise<void> {
    let continuar = true;

    while (continuar) {
        const resposta = await inquirer.prompt([
            {
                type: 'list',
                name: 'opcao',
                message: 'BookStore Manager CLI - O que você deseja fazer?',
                choices: ['Autores','Livros','Clientes','Emprestimo','Relatorios','Sair'],
            },
        ]);

        switch (resposta.opcao) {
            case 'Autores':
                await exibirMenuAutor();
                break;
            case 'Livros':
                await exibirMenuLivro();
                break;
            case 'Clientes':
                await exibirMenuCliente();
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