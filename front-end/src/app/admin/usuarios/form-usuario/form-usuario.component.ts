import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuariosService } from '../../servicos/usuarios.service';
import { JwtHelperService } from '@auth0/angular-jwt';
interface IUser {
  _id?: string,
  userName: string,
  password: string,
  type: string
}
@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {
  @Input() user: IUser;
  userName: string;
  password: string;
  type: string;
  @Output() close = new EventEmitter();
  error: boolean;
  titulo: string;
  usuarioLogado: any;
  constructor(
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    if (this.user) {
      this.titulo = "Editar usuário";
      this.userName = this.user.userName;
      this.password = this.user.password;
      this.type = this.user.type;
    } else {
      this.titulo = "Adicionar novo usuário";
    }
    const helperJWT = new JwtHelperService();
    let token = helperJWT.decodeToken(localStorage.getItem('token'));
    this.usuarioLogado = token; 
  }

  salvar(form: NgForm) {
    if (this.titulo === 'Adicionar novo usuário') {
      this.usuariosService.salvar(form)
        .then(() => {
          this.close.emit('');
        })
        .catch(err => {
          console.error(`Erro ao salvar usuário: ${err}`);
        });
    } else {
      this.usuariosService.atualizar(this.user._id,form)
        .then(() => {
          this.close.emit('');
        })
        .catch(err => {
          console.error(`Erro ao salvar usuário: ${err}`);
        });
    }
  }

  limpar(form: NgForm) {
    form.reset();
    this.close.emit('');
  }

  isUserLogado(): boolean{
    if(this.user){
      return this.usuarioLogado._id === this.user._id;
    }
    return false;
  }
}
