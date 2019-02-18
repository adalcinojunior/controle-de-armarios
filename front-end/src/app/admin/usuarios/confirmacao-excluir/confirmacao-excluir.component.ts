import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmacao-excluir',
  templateUrl: './confirmacao-excluir.component.html',
  styleUrls: ['./confirmacao-excluir.component.css']
})
export class ConfirmacaoExcluirComponent {
  @Output() excluir = new EventEmitter();
  @Output() cancelar = new EventEmitter();

  constructor() { }

 
  clicouExcluir() {
    this.excluir.emit();
  }

  clicouCancelar() {
    this.cancelar.emit();
  }

}
