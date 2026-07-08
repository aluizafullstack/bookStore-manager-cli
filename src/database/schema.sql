-- =======================================================
-- 1. TABELA: AUTORES
-- =======================================================
CREATE TABLE AUTORES (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nacionalidade VARCHAR(150),
    data_nascimento DATE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =======================================================
-- 2. TABELA: LIVROS
-- =======================================================
CREATE TABLE LIVROS (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    fk_autor INTEGER NOT NULL,
    quantidade_total INTEGER NOT NULL DEFAULT 0,
    quantidade_disponivel INTEGER NOT NULL DEFAULT 0,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_livros_autores
        FOREIGN KEY (fk_autor)
        REFERENCES AUTORES(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,

    CHECK (quantidade_disponivel >= 0)
);

-- =======================================================
-- 3. TABELA: CLIENTES
-- =======================================================
CREATE TABLE CLIENTES (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =======================================================
-- 4. TABELA: EMPRÉSTIMOS
-- =======================================================
CREATE TABLE EMPRESTIMOS (
    id SERIAL PRIMARY KEY,
    fk_livro INTEGER NOT NULL,
    fk_cliente INTEGER NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_devolucao_prevista DATE NOT NULL,
    data_devolucao_real DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'Ativo',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_emprestimos_livros
        FOREIGN KEY (fk_livro)
        REFERENCES LIVROS(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,

    CONSTRAINT fk_emprestimos_clientes
        FOREIGN KEY (fk_cliente)
        REFERENCES CLIENTES(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- ==================================================================
-- 5. Realização do teste do banco de dados e para a criação do video
-- ==================================================================

INSERT INTO AUTORES (nome, nacionalidade) VALUES
('Machado de Assis', 'Brasileira'),
('J.K. Rowling', 'Britânica');

INSERT INTO CLIENTES (nome, email) VALUES
('Ana Luiza', 'ana@teste.com'),
('Carlos Silva', 'carlos@teste.com');

INSERT INTO LIVROS (titulo, fk_autor, quantidade_total, quantidade_disponivel) VALUES
('Dom Casmurro', 1, 3, 3),
('Harry Potter e a Pedra Filosofal', 2, 5, 5);