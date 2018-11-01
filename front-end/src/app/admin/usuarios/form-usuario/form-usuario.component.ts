import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuariosService } from '../../servicos/usuarios.service';
interface IUser{
  userName: string,
  password: string
}
@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {
  @Input() user: IUser;
  @Output() close = new EventEmitter();
  error: boolean;
  titulo: string;
  constructor(
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    if(this.user){
      this.titulo = "Editar usuário";
    }else{
      this.titulo = "Adicionar novo usuário";
    }
    console.log(`USUARIO: ${JSON.stringify(this.user)}`);
  }

  salvar(form: NgForm){
    this.usuariosService.salvar(form)
      .then(() => {
        this.close.emit('');
      })
      .catch();
    
  }

  limpar(form: NgForm){
    form.reset();
    this.close.emit('');
  }
}
