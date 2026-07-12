import * as EmprestimoRepository from '../repositories/EmprestimoRepository';
import * as LivroRepository from '../repositories/LivrosRepository';
import * as ClienteRepository from '../repositories/ClienteRepository';
import { Emprestimo } from '../models/Emprestimo';

export async function registrarEmprestimo (fkLivro: number, fkCliente: number, diasParaDevolucao: number): Promise<Emprestimo> {

    validarId(fkLivro);
    validarId(fkCliente);
    validarDias(diasParaDevolucao);

    const livro = await LivroRepository.buscarLivroPorId(fkLivro);
    if (!livro) {
        throw new Error(`Livro com id ${fkLivro} não existe.`);
    }

    const cliente = await ClienteRepository.buscarClientePorId(fkCliente);
    if (!cliente) {
        throw new Error(`Cliente com id ${fkCliente} não existe.`);
    }

    if (livro.quantidade_disponivel <= 0) {
        throw new Error(`O livro "${livro.titulo}" não está disponível para empréstimo no momento.`);
    }

    const dataEmprestimo = new Date();
    const dataDevolucaoPrevista = new Date();
    dataDevolucaoPrevista.setDate(dataEmprestimo.getDate() + diasParaDevolucao);

    const dados = await EmprestimoRepository.inserirEmprestimo(fkLivro, fkCliente, dataEmprestimo, dataDevolucaoPrevista);

    await LivroRepository.retirarQuantidadeDisponivel(fkLivro);
    return new Emprestimo(dados);
}

export async function listarTodosEmprestimos(): Promise<Emprestimo[]> {
    
    const dados = await EmprestimoRepository.listarEmprestimos();
    return dados.map(e => new Emprestimo(e));
}

export async function listarEmprestimosAtivos(): Promise<Emprestimo[]> {

    const dados = await EmprestimoRepository.listarEmprestimosAtivos();
    return dados.map(e => new Emprestimo(e));
}

export async function buscarEmprestimoPorId(id: number): Promise<Emprestimo> {
    
    validarId(id);
    const dados = await EmprestimoRepository.buscarEmprestimosPorId(id);

    if (!dados) {
        throw new Error(`Empréstimo com id ${id} não encontrado.`);
    }
    return new Emprestimo(dados);
}

export async function devolverLivro(id: number): Promise<Emprestimo> {

    validarId(id);

    const emprestimo = await EmprestimoRepository.buscarEmprestimosPorId(id);
    if (!emprestimo) {
        throw new Error(`Empréstimo com id ${id} não encontrado.`);
    }

    if (emprestimo.status === 'Devolvido') {
        throw new Error('Esse empréstimo já foi devolvido anteriormente.');
    }

    const dataDevolucaoReal = new Date();
    const dados = await EmprestimoRepository.registrarDevolucao(id, dataDevolucaoReal);

    if (!dados) {
        throw new Error(`Empréstimo com id ${id} não encontrado.`);
    }

    await LivroRepository.adicionarQuantidadeDisponivel(emprestimo.fk_livro);

    return new Emprestimo(dados);
}

// ===============================================================================
//                             Funções de validação
// ===============================================================================

function validarId(id: number): void {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('ID inválido. Deve ser um número inteiro positivo.');
  }
}

function validarDias(dias: number): void {
  if (!Number.isInteger(dias) || dias <= 0) {
    throw new Error('O prazo para devolução deve ser um número inteiro maior que zero.');
  }
}