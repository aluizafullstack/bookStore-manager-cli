import * as AutorRepository from '../repositories/AutorRepository';
import { Autor } from '../models/Autor';

export async function cadastrarAutor (nome: string, nacionalidade: string | null, dataNascimento: Date | null): Promise<Autor> {
    
    validarNome(nome);
    validarNacionalidade(nacionalidade);
    validarDataNascimento(dataNascimento);

    const dados = await AutorRepository.inserirAutor(nome.trim(), nacionalidade, dataNascimento);
    return new Autor(dados);
}

export async function listarTodosAutores(): Promise<Autor[]> {
    const dados = await AutorRepository.listarAutores();
    return dados.map(a => new Autor(a));
}

export async function buscasAutorPorId (id: number): Promise<Autor> {
    
    validarId(id);

    const dados = await AutorRepository.buscarAutorPorId(id);

    if (!dados) {
        throw new Error (`Autor com id ${id} não encontrado.`);
    }

    return new Autor(dados);
}

export async function buscarAutorPorNome (nome: string) {
    
    validarNome(nome);

    const dados = await AutorRepository.buscarAutorPorNome(nome.trim());

    if (!dados) {
        throw new Error (`Autor com o nome ${nome} não encontrado.`);
    }
   return new Autor(dados); 
}

export async function atualizarDadosAutor (id: number, nome: string, nacionalidade: string | null, dataNascimento: Date | null): Promise<Autor> {
    
    validarNome(nome);
    validarNacionalidade(nacionalidade);
    validarDataNascimento(dataNascimento);

    const dados = await AutorRepository.atualizarAutor(id, nome.trim(), nacionalidade, dataNascimento);

    if (!dados) {
        throw new Error(`Autor com id ${id} não encontrado.`);
    }
    return new Autor(dados);
}

export async function excluirAutorPorId (id: number): Promise<void> {
    validarId(id);

    const remover = await AutorRepository.removerAutorPorId(id);
    
    if (!remover) {
        throw new Error (`Autor com id ${id} não encontrado.`);
    }
}

export async function excluirAutorPorNome (nome: string): Promise<void> {
    validarNome(nome);

    const remover = await AutorRepository.removerAutorPorNome(nome.trim());
    
    if (!remover) {
        throw new Error (`Autor com o nome ${nome} não encontrado.`);
    }
}

// ===============================================================================
//                             Funções de validação
// ===============================================================================

function validarNome (nome: string) {

    if (!nome || nome.trim() === '') {
        throw new Error ('O nome do autor é obrigatório.');
    }
    if (nome.trim().length < 2) {
        throw new Error ('O nome do aoutros deve ter pelo menos 2 caracteres.');
    }
    if (nome.trim().length > 100) {
        throw Error ('O nome do autor não pode ultrapassar 100 caracteres.');
    }
}

function validarNacionalidade (nacionalidade: string | null) {
    
    if (nacionalidade !== null && nacionalidade.trim().length > 150) {
        throw Error ('a nacionalidade não pode ultrapassar 150 caracteres.');
    }
}

function validarDataNascimento (dataNascimento: Date | null) {
    
    if (dataNascimento == null) return;

    const hoje = new Date();
    if (dataNascimento > hoje) {
        throw Error ('A data de nascimento não pode ser no futuro.');
    }
}

function validarId (id: number) {
    if(!Number.isInteger(id) || id <= 0) {
        throw Error ('ID inválido. Deve ser um número inteiro positivo.');
    }
}