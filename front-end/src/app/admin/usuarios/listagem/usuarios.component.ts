import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UsuariosService } from '../../servicos/usuarios.service';

enum TypeUser {
  'ADMIN', 'USER'
}
interface IUser {
  _id?: string,
  userName: string,
  password: string,
  type: TypeUser
}
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  users: IUser[];
  modaladicionar: boolean;
  modaleditar: boolean;
  modalexcluir: boolean;
  user: IUser;
  usuarioLogado: any;  
  constructor(
    private usersService: UsuariosService
  ) { }

  ngOnInit() {
    this.carregarUsuarios('');
    const helperJWT = new JwtHelperService();
    let token = helperJWT.decodeToken(localStorage.getItem('token'));
    this.usuarioLogado = token; 
  }

  carregarUsuarios(busca: string) {
    this.usersService.buscarTodos(busca)
      .then(response => {
        this.users = response;
      })
      .catch();
  }

  pesquisar(evento: any) {
    let busca: string = evento.target.value;
    if(busca){
      this.carregarUsuarios('?query=' + busca);    
    }else{
      this.carregarUsuarios('');    
    }
  }

  modalAdicionar() {
    this.modaladicionar = true;
  }

  fecharModalAdicionar() {
    this.modaladicionar = false;
    this.carregarUsuarios('');
  }


  modalEditar(user: IUser) {
    this.user = user;
    this.modaleditar = true;
  }

  fecharModalEditar() {
    this.modaleditar = false;
    this.carregarUsuarios('');
  }

  mostarModalExlcuir(user: any) {
    this.user = user;
    this.modalexcluir =true;
  }

  excluirUser() {
    this.usersService.excluir(this.user._id)
      .then(() => {
        this.carregarUsuarios('');
        this.fecharModalExcluir();
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  }

  fecharModalExcluir() {
    this.user = null;
    this.modalexcluir = false;
  }

  isUserLogado(user: any) {    
    return this.usuarioLogado._id === user._id;
  }
}
