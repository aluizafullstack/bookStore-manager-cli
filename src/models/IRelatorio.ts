export interface ILivroDisponivel {
    titulo: string;
    autor: string;
    quantidade_disponivel: number;
}

export interface ILivroEmprestado {
    titulo: string;
    cliente: string;
    data_emprestimo: Date;
    data_devolucao_prevista: Date;
}

export interface ILivrosPorAutor {
    autor: string;
    total_livros: number;
}

export interface IEmprestimosPorLivro {
    titulo: string;
    total_emprestimos: number;
}

export interface IClienteComAtivos {
    nome: string;
    emprestimos_ativos: number;
}

export interface ITopLivro {
    titulo: string;
    total_emprestimos: number;
}

export interface ILivroComTotal {
    titulo: string;
    total_emprestado: number;
}

export interface IAutorComVariosLivros {
    autor_id: number;
    nome: string;
    total_livros: number;
}

export interface ILivroSimples {
    id: number;
    titulo: string;
}

export interface IClienteSimples {
    id: number;
    nome: string;
}

export interface IAutorSimples {
    id: number;
    nome: string;
}

export interface IEmprestimoAcimaMedia {
    id: number;
    cliente: string;
    duracao_dias: number;
}

export interface IConsolidadoCliente {
    nome: string;
    total_emprestimos: number;
}

export interface IPopularidadeLivro {
    titulo: string;
    autor: string;
    total_emprestimos: number;
}