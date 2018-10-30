import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/autenticacao.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(
    private router: Router,
    private AutenticarServico: AuthService
  ) { }  

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
