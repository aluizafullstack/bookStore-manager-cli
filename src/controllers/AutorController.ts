import * as AutorService from '../services/AutorService';

export async function cadastrarAutor (nome: string, nacionalidade: string | null, dataNascimento: Date | null): Promise<void> {

    try {
        const autor = await AutorService.cadastrarAutor (nome, nacionalidade, dataNascimento);
        console.log (`Autor cadastrado com sucesso" ID: ${autor.id}`);

    } catch (erro: any) {
        console.log (`Erro ao cadastrar autor: ${erro.message}`);
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
                Criado: a.criadoEm.toLocaleString ('pt-BR'),
                Atualizado: a.atualizadoEm.toLocaleString ('pt-BR'),
            }))
        )

    } catch (erro: any) {
        console.log (`Erro ao listar autores: ${erro.message}`);
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
                Criado: autor.criadoEm.toLocaleString ('pt-BR'),
                Atualizado: autor.atualizadoEm.toLocaleString ('pt-BR'),
            },
        ]);

    } catch (erro: any) {
        console.error (`Erro ao buscar o autor por Id: ${erro.message}`);
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
                Criado: autor.criadoEm.toLocaleString ('pt-BR'),
                Atualizado: autor.atualizadoEm.toLocaleString ('pt-BR'),
            },
        ]);

    } catch (erro: any) {
        console.error (`Erro ao buscar o autor por nome: ${erro.message}`);
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
                Criado: autor.criadoEm.toLocaleString ('pt-BR'),
                Atualizado: autor.atualizadoEm.toLocaleString ('pt-BR')
            },  
        ]);

    } catch (erro: any) {
        console.error (`Erro ao atualizar o autor: ${erro.message}`);

    }
}

export async function excluirAutorPorId (id:number): Promise<void> {
    
    try {
        await AutorService.excluirAutorPorId (id);
        console.log (`Autor com id ${id} removido com sucesso!`);

    } catch (erro:any) {
        console.error (`Erro ao remover o Autor por Id: ${erro.message}`);
    }
}

export async function excluirAutorPorNome (nome: string): Promise<void> {

    try {
        await AutorService.excluirAutorPorNome (nome);
        console.log (`Autor com o nome ${nome} removido com sucesso!`);

    } catch (erro: any) {
        console.error (`Erro ao tentar excluir o Autor por nome: ${erro.message}`);
    }
}