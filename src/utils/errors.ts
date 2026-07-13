// Essas duas classes estão herdando do Error nativo no JavaScript e com isso, throw, cath, .message e outros metodos do error continuam funcionando

export class ErroNãoEncontrado extends Error {

    constructor(mensagem: string) {
        super (mensagem);
        this.name = 'ErroNãoEncontrado'
    }
}

export class ValidarErro extends Error {
    
    constructor(mensagem: string) {
        super (mensagem);
        this.name = 'ValidarErro'
    }
}