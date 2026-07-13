import * as ClienteRepository from '../repositories/ClienteRepository';
import { Cliente } from '../models/Cliente';
import { ErroNãoEncontrado, ValidarErro } from '../utils/errors';

export async function cadastrarCliente (nome: string, email: string, telefone: string | null): Promise<Cliente> {
    validarNome(nome);
    validarEmail(email);
    validarTelefone(telefone);
    await validarEmailClienteNaoDuplicado(email);

    const dados = await ClienteRepository.inserirCliente(nome.trim(), email.trim().toLocaleLowerCase(), telefone);
    return new Cliente(dados);
}

export async function listarTodosCliente(): Promise<Cliente[]> {
    const dados = await ClienteRepository.listarClientes();
    return dados.map(c => new Cliente(c));
}

export async function buscarClientePorId (id: number): Promise<Cliente> {
    
    validarId(id);

    const dados = await ClienteRepository.buscarClientePorId(id);

    if (!dados) {
        throw new ErroNãoEncontrado (`Cliente com id ${id} não encontrado.`);
    }

    return new Cliente(dados);
}

export async function buscarClientePorNome (nome: string): Promise<Cliente> {
    
    validarNome(nome);

    const dados = await ClienteRepository.buscarClientePorNome(nome);

    if (!dados) {
        throw new ErroNãoEncontrado (`Cliente com nome ${nome} não encontrado.`);
    }

    return new Cliente(dados);
}

export async function buscarClientePorEmail (email: string): Promise<Cliente> {
    
    validarEmail(email);

    const dados = await ClienteRepository.buscarClientePorEmail(email);

    if (!dados) {
        throw new ErroNãoEncontrado (`Cliente com email ${email} não encontrado.`);
    }

    return new Cliente(dados);
}

export async function atualizarCliente (id:number, nome: string, email: string, telefone: string | null): Promise<Cliente> {

    validarId(id);
    validarNome(nome);
    validarEmail(email);
    validarTelefone(telefone);
    await validarEmailClienteNaoDuplicado(email);

    const dados = await ClienteRepository.atualizarCliente(id, nome.trim(), email.trim().toLocaleLowerCase(), telefone);

    if (!dados) {
        throw new ErroNãoEncontrado (`Cliente com id ${id} não encontrado.`)
    }

    return new Cliente(dados);
}

export async function excluirClientePorId (id: number): Promise<void> {

    validarId(id);

    const remover = await ClienteRepository.removerClientePorId(id);

    if (!remover) {
        throw new ErroNãoEncontrado (`Cliente com id ${id} não encontrado.`)
    }
}

export async function excluirClientePorNome (nome: string): Promise<void> {

    validarNome(nome);

    const remover = await ClienteRepository.removerClientePorNome(nome);

    if (!remover) {
        throw new ErroNãoEncontrado (`Cliente com nome ${nome} não encontrado.`)
    }
}

// ===============================================================================
//                             Funções de validação
// ===============================================================================

function validarNome (nome: string): void {

    if (!nome || nome.trim() === '') {
        throw new ValidarErro ('O nome do cliente é obrigatório');
    }
    if (nome.trim().length > 100) {
        throw new ValidarErro ('O nome do cliente não pode ultrapassar 100 caracteres');
    }
}

function validarId (id: number) {
    if(!Number.isInteger(id) || id <= 0) {
        throw new ValidarErro ('ID inválido. Deve ser um número inteiro positivo.');
    }
}

function validarEmail(email: string): void {
    const emailFormatado = email.trim();

    if (!emailFormatado) {
        throw new ValidarErro ('O e-mail é obrigatório.');
    }

    if (emailFormatado.length > 150) {
        throw new ValidarErro ('O e-mail não pode ultrapassar 150 caracteres.');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFormatado)) {
        throw new ValidarErro ('E-mail inválido.');
    }
}

function validarTelefone(telefone: string | null): void {
  if (telefone !== null && telefone.trim().length > 20) {
    throw new ValidarErro ('O telefone não pode ultrapassar 20 caracteres.');
  }
}

async function validarEmailClienteNaoDuplicado(email: string): Promise<void> {
  const existente = await ClienteRepository.buscarClientePorEmail(email);
  if (existente) {
    throw new ValidarErro (`Já existe um cliente cadastrado com o nome "${email}".`);
  }
}