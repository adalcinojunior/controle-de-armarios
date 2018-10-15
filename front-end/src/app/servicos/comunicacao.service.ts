import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class ComunicacaoService {
    alocacao = new EventEmitter();
    
    constructor() {}

    alocacaoSalva() {
        this.alocacao.emit('Alocação salva!');
    }
    
    alocacaoDevolvida() {
        this.alocacao.emit('Alocação devolvida!');
    }

    
}
