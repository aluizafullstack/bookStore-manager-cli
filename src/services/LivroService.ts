import * as LivrosRepository from '../repositories/LivrosRepository';
import * as AutorRepository from '../repositories/AutorRepository';
import { Livro } from '../models/Livro';
import { ErroNãoEncontrado, ValidarErro } from '../utils/errors';

export async function cadastrarLivro (titulo: string, fkAutor: number, quantidadeTotal: number): Promise<Livro> {

    validarTitulo(titulo);
    validarQuantidade(quantidadeTotal)
    await validarAutorExistente(fkAutor);
    await validarLivroNaoDuplicado(titulo);

    // A quanrtidade_disponivel vai começar igual a quantidade_total
    const dados = await LivrosRepository.inserirLivro (titulo.trim(), fkAutor, quantidadeTotal, quantidadeTotal);
    return new Livro(dados);
}

export async function listarTodosLivros(): Promise<Livro[]> {
    
    const dados = await LivrosRepository.listarLivros();
    return dados.map(l => new Livro(l));
}

export async function buscarLivroPorId (id: number): Promise<Livro> {
    
    validarId(id);

    const dados = await LivrosRepository.buscarLivroPorId(id);

    if (!dados) {
        throw new ErroNãoEncontrado (`Livro com o id ${id} não encontrado.`);
    }

    return new Livro(dados);
}

export async function buscarLivroPorTitulo (titulo: string): Promise<Livro> {

    validarTitulo(titulo);

    const dados = await LivrosRepository.buscarLivroPorTitulo(titulo);

    if (!dados) {
        throw new ErroNãoEncontrado (`Livro com o titulo ${titulo} não encontrado.`);
    }

    return new Livro(dados);
}

export async function atualizarDadosLivro (id: number, titulo: string, fkAutor: number, quantidadeTotal: number, quantidadeDisponivel: number): Promise<Livro> {

    validarId(id);
    validarTitulo(titulo);
    await validarAutorExistente(fkAutor);
    validarQuantidade(quantidadeTotal);

    if (quantidadeDisponivel > quantidadeTotal) {
        throw new ErroNãoEncontrado (`Quantidade disponível não pode ser maior que a total de livros: ${quantidadeTotal}.`);
    }

    if (quantidadeDisponivel < 0) {
        throw new ErroNãoEncontrado ('Quantidade disponível não pode ser negativa.');
    }

    const dados = await LivrosRepository.atulizarLivros(id, titulo.trim(), fkAutor, quantidadeTotal, quantidadeDisponivel);

    if (!dados) {
        throw new ErroNãoEncontrado (`Livro com o id ${id} não encontrado.`);
    }

    return new Livro(dados);
}

export async function excluirLivroPorId (id: number): Promise<void> {

    validarId(id);

    const remover = await LivrosRepository.removerLivroPorId(id);

    if (!remover) {
        throw new ErroNãoEncontrado (`Livro com o id ${id} não encontrado.`);
    }
}

export async function excluirLivroPorTitulo (titulo: string): Promise<void> {

    validarTitulo(titulo);

    const remover = await LivrosRepository.buscarLivroPorTitulo(titulo);

    if (!remover) {
        throw new ErroNãoEncontrado (`Livro com o Titulo ${titulo} não encontrado.`);
    }
}


// ===============================================================================
//                             Funções de validação
// ===============================================================================

function validarTitulo (titulo: string): void {

    if (!titulo || titulo === '') {
        throw new ValidarErro ('O nome do titulo do livro é obrigatório.');
    }

    if (titulo.trim().length > 200) {
        throw new ValidarErro ('O nome do livro não pode ultrapassar 200 caracteres.');
    }
}

async function validarAutorExistente (fkAutor: number): Promise<void> {
    
    const autor = await AutorRepository.buscarAutorPorId(fkAutor);

    if (!autor) {
        throw new ValidarErro (`Não é possível cadastrar o livro: o autor com id ${fkAutor} não existe.`);
    }

}

async function validarLivroNaoDuplicado(titulo: string): Promise<void> {
    const existente = await LivrosRepository.removerLivroPorTitulo(titulo);
    if (existente) {
        throw new ValidarErro (`Esse autor já tem um livro cadastrado com o título "${titulo}".`);
    }
}

function validarQuantidade (quantidade: number): void {
    
    if (!Number.isInteger(quantidade) || quantidade < 0) {
        throw new ValidarErro ('A quantidade total deve ser um número inteiro maior ou igual a zero.');
    }
}

function validarId (id: number): void {

    if (!Number.isInteger(id) || id <= 0) {
        throw new ValidarErro ('ID inválido. Deve ser um número inteiro positivo.');
    }
}