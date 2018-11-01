import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './servicos/autenticacao.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  usuario;
  constructor(
    private router: Router,
    private AutenticarServico: AuthService
  ) { }

  ngOnInit() {
    const helperJWT = new JwtHelperService();
    let token = helperJWT.decodeToken(localStorage.getItem('token'));
    this.usuario = token.user;
  }


  logout() {
    this.AutenticarServico.logout()
      .then(response => {
        //console.log(`Logout realizado com sucesso: ${JSON.stringify(response)}`);
        this.router.navigate(['home']);
        localStorage.clear();
      })
      .catch(err => {
        console.error(`Problemas ao realizar logout: ${JSON.stringify(err)}`);
      });
  }

  mostar(dt: any) {
    console.log(dt.exportCSV())
  }

}
