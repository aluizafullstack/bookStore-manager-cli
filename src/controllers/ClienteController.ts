import * as ClienteService from '../services/ClienteService';
import { ErroNãoEncontrado, ValidarErro } from '../utils/errors';

export async function cadastrarCliente (nome: string, email: string, telefone: string | null): Promise<void> {

    try {
        const cliente = await ClienteService.cadastrarCliente (nome, email, telefone);
        console.log(`Cliente cadastrado com sucesso! ID: ${cliente.id}`);

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

export async function listarClientes(): Promise<void> {
    
    try {
        const clientes = await ClienteService.listarTodosCliente();
        if (clientes.length === 0) {
            console.log ('Nenhum cliente cadastrado.');
            return;
        }

        console.table (
            clientes.map (c => ({
                ID: c.id,
                Nome: c.nome,
                Email: c.email,
                Telefone: c.telefone ?? '-',
                Criado: c.criadoEm.toLocaleString('pt-BR'),
                Atualizado: c.atualizadoEm.toLocaleString('pt-BR'),
            }))
        );

    } catch(erro) {
        if (erro instanceof ErroNãoEncontrado) {
            console.error (`Não encontrado: ${erro.message}`);
        } else if (erro instanceof ValidarErro) {
            console.error (`Dados invalidos: ${erro.message}`);
        } else {
            console.error (`Erro inesperado: ${(erro as Error).message}`);
        } 
    }
}

export async function consultarClientePorId (id: number): Promise<void> {

    try{
        const cliente = await ClienteService.buscarClientePorId(id);
        
        console.table ([
            {
                ID: cliente.id,
                Nome: cliente.nome,
                Email: cliente.email,
                Telefone: cliente.telefone ?? '-',
                Criado: cliente.criadoEm.toLocaleString('pt-BR'),
                Atualizado: cliente.atualizadoEm.toLocaleString('pt-BR'),
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

export async function consultarClientePorNome (nome: string): Promise<void> {

    try{
        const cliente = await ClienteService.buscarClientePorNome(nome);
        
        console.table ([
            {
                ID: cliente.id,
                Nome: cliente.nome,
                Email: cliente.email,
                Telefone: cliente.telefone ?? '-',
                Criado: cliente.criadoEm.toLocaleString('pt-BR'),
                Atualizado: cliente.atualizadoEm.toLocaleString('pt-BR'),
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

export async function atualizarCliente (id: number, nome: string, email: string, telefone: string | null): Promise<void> {

    try{
        const cliente = await ClienteService.atualizarCliente(id, nome, email, telefone);
        
        console.log (`Dados do cliente atualizado com sucesso!`)
        console.table ([
            {
                ID: cliente.id,
                Nome: cliente.nome,
                Email: cliente.email,
                Telefone: cliente.telefone ?? '-',
                Criado: cliente.criadoEm.toLocaleString('pt-BR'),
                Atualizado: cliente.atualizadoEm.toLocaleString('pt-BR'),
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

export async function excluirClientePorId (id: number): Promise<void> {

    try{
        await ClienteService.excluirClientePorId(id);
        console.log (`Cliente com id ${id} removido com sucesso!`)

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

export async function excluirClientePorNome (nome: string): Promise<void> {

    try{
        await ClienteService.excluirClientePorNome(nome);
        console.log (`Cliente com nome ${nome} removido com sucesso!`)

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