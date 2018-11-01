import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicos/usuarios.service';
enum TypeUser{
  'ADMIN', 'USER'
}
interface IUser{
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
  user: IUser;
  constructor(
    private usersService: UsuariosService
  ) { }

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios(){
    this.usersService.buscarTodos()
      .then(response => {
        this.users = response;
      })
      .catch();
  }

  pesquisar(evento: any) {

  }

  modalAdicionar(){
    this.modaladicionar = true;
  }

  fecharModalAdicionar(){
    this.modaladicionar = false;
    this.carregarUsuarios();
  }

  excluirUser(user: any){
    this.usersService.excluir(user._id)
      .then(() => {
        this.carregarUsuarios();
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  }

  modalEditar(user: IUser){
    this.user = user;
    this.modaleditar = true;
  }

  fecharModalEditar(){
    this.modaleditar = false;
    this.carregarUsuarios();
  }
}
