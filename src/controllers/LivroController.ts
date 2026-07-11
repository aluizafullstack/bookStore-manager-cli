import * as LivroService from '../services/LivroService';

export async function cadastrarLivro (titulo: string, fkAutor: number, quantidadeTotal: number): Promise<void> {
    
    try {
        const livro = await LivroService.cadastrarLivro(titulo, fkAutor, quantidadeTotal);
        console.log (`Livro cadastrado com sucesso! ID: ${livro.id}`);
    
    } catch (erro: any) {
        console.error (`Erro ao cadastrar o livro: ${erro.message}`);
    }
}

export async function listarLivros(): Promise<void> {

    try{
        const livros = await LivroService.listarTodosLivros();
        if (livros.length === 0) {
            console.log('Nenhum livro cadratado.');
            return;
        }

        console.table (
            livros.map (l => ({
                ID: l.id,
                Titulo: l.titulo,
                Autor_ID: l.fk_autor,
                Total: l.quantidade_total,
                Disponivel: l.quantidade_disponivel,
                Criado: l.criadoEm.toLocaleString('pt-BR'),
                Atualizado: l.atualizaEm.toLocaleString('pt-BR'),
            }))
        );

    } catch (erro: any) {
        console.error (`Erro ao listar livros: ${erro.message}`);
    }
}

export async function consultarLivroPorId (id: number): Promise<void> {

    try {
        const livro = await LivroService.buscarLivroPorId(id);

        console.log ('Segue dados da sua consulta: ');
        console.table ([
            {
                ID: livro.id,
                Titulo: livro.titulo,
                Autor_ID: livro.fk_autor,
                Total: livro.quantidade_total,
                Disponivel: livro.quantidade_disponivel,
                Criado: livro.criadoEm.toLocaleString('pt-BR'),
                Atualizado: livro.atualizaEm.toLocaleString('pt-BR'),
            },
        ]);

    } catch (erro: any) {
        console.error (`Erro ao bucas livro por Id: ${erro.message}`);
    }
}

export async function consultarLivroPorTitulo (titulo: string): Promise<void> {

    try {
        const livro = await LivroService.buscarLivroPorTitulo(titulo);

        console.log ('Segue dados da sua consulta: ');
        console.table ([
            {
                ID: livro.id,
                Titulo: livro.titulo,
                Autor_ID: livro.fk_autor,
                Total: livro.quantidade_total,
                Disponivel: livro.quantidade_disponivel,
                Criado: livro.criadoEm.toLocaleString('pt-BR'),
                Atualizado: livro.atualizaEm.toLocaleString('pt-BR'),
            },
        ]);

    } catch (erro: any) {
        console.error (`Erro ao bucas livro por Titulo: ${erro.message}`);
    }
}

export async function atulizarDadosLivro (id:number, titulo:string, fkAutor:number, quantidadeTotal:number, quantidadeDisponivel:number): Promise<void> {

    try {

        const livro = await LivroService.atualizarDadosLivro(id, titulo, fkAutor, quantidadeTotal, quantidadeDisponivel);

        console.log ('Dados do Livro atualizado com sucesso! Segue dados atuais:');
        console.table ([
            {
                ID: livro.id,
                Titulo: livro.titulo,
                Autor_ID: livro.fk_autor,
                Total: livro.quantidade_total,
                Disponivel: livro.quantidade_disponivel,
                Criado: livro.criadoEm.toLocaleString('pt-BR'),
                Atualizado: livro.atualizaEm.toLocaleString('pt-BR'),
            }
        ])

    } catch (erro: any) {
        console.error (`Erro ao atulizar os dados do livro: ${erro.message}`);
    }
}

export async function excluirLivroPorId (id:number): Promise<void> {

    try{

        await LivroService.excluirLivroPorId(id);
        console.log (`Livro com o id ${id} removido com sucesso!`);

    } catch (erro: any) {
        console.error (`Erro ao tentar excluir o Livro por id: ${erro.message}`);
    }
}

export async function excluirLivroPorTitulo (titulo:string): Promise<void> {

    try{

        await LivroService.excluirLivroPorTitulo(titulo);
        console.log (`Livro com o Titulo ${titulo} removido com sucesso!`);

    } catch (erro: any) {
        console.error (`Erro ao tentar excluir o Livro por Titulo: ${erro.message}`);
    }
}