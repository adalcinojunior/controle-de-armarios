import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosComponent } from './listagem/usuarios.component';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { FormsModule } from '@angular/forms';
import { ConfirmacaoExcluirComponent } from './confirmacao-excluir/confirmacao-excluir.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [UsuariosComponent, FormUsuarioComponent, ConfirmacaoExcluirComponent],
  exports: [UsuariosComponent]
})
export class UsuariosModule { }
