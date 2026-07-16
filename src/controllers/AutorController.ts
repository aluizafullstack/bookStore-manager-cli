import * as AutorService from '../services/AutorService';
import { ErroNãoEncontrado, ValidarErro } from '../utils/errors';
import { formatarDataHora } from '../utils/formatters';

export async function cadastrarAutor (nome: string, nacionalidade: string | null, dataNascimento: Date | null): Promise<void> {

    try {
        const autor = await AutorService.cadastrarAutor (nome, nacionalidade, dataNascimento);
        console.log (`Autor cadastrado com sucesso" ID: ${autor.id}`);

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

export async function listarAutores(): Promise<void> {

    try{
        const autores = await AutorService.listarTodosAutores();
        if (autores.length === 0) {
            console.log ('Nenhum autor cadastrado.');
            return;
        }

        console.table (
            autores.map (a => ({
                ID: a.id,
                Nome: a.nome,
                Nacionalidade: a.nacionalidade ?? '-',
                Criado: formatarDataHora(a.criadoEm),
                Atualizado: formatarDataHora(a.atualizadoEm),
            }))
        )

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

export async function consultarAutorPorId (id: number): Promise<void> {
    
    try {
        const autor = await AutorService.buscasAutorPorId (id);

        console.table ([
            {
                ID: autor.id,
                Nome: autor.nome,
                Nacionalidade: autor.nacionalidade ?? '-',
                Criado: formatarDataHora(autor.criadoEm),
                Atualizado: formatarDataHora(autor.atualizadoEm),
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

export async function consultarAutorPorNome (nome: string): Promise<void> {

    try{

        const autor = await AutorService.buscarAutorPorNome (nome);

        console.table ([
            {
                ID: autor.id,
                Nome: autor.nome,
                Nacionalidade: autor.nacionalidade ?? '-',
                Criado: formatarDataHora(autor.criadoEm),
                Atualizado: formatarDataHora(autor.atualizadoEm),
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

export async function atualizarAutor (id: number, nome: string, nacionalidade: string | null, dataNascimento: Date | null): Promise<void> {

    try{

        const autor = await AutorService.atualizarDadosAutor (id, nome, nacionalidade, dataNascimento);
        
        console.log (`Dados do Autor atualizado com sucesso!`);
        console.table ([
            {
                ID: autor.id,
                Nome: autor.nome,
                Nacionalidade: autor.nacionalidade ?? '-',
                Criado: formatarDataHora(autor.criadoEm),
                Atualizado: formatarDataHora(autor.atualizadoEm)
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

export async function excluirAutorPorId (id:number): Promise<void> {
    
    try {
        await AutorService.excluirAutorPorId (id);
        console.log (`Autor com id ${id} removido com sucesso!`);

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

export async function excluirAutorPorNome (nome: string): Promise<void> {

    try {
        await AutorService.excluirAutorPorNome (nome);
        console.log (`Autor com o nome ${nome} removido com sucesso!`);

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