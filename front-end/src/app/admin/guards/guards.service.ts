import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth/autenticacao.service';

@Injectable()
export class GuardsService implements CanActivate {

  constructor(
    private router: Router,
    private AutenticarServico: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean | any{

    const helperJWT = new JwtHelperService();
    let token = localStorage.getItem("token");
    let refreshToken = localStorage.getItem("refreshToken");
    /**
     * Caso o usuário possua os tokens de acesso
     */
    if (token && refreshToken) {
      const isExpired = helperJWT.isTokenExpired(token);// Verifica a validade do token
      if (!isExpired) {
        return this.AutenticarServico.refreshToken()
          .then(response => {
              //console.log(`Resfresh token: ${JSON.stringify(response)}`);
              localStorage.clear();
              localStorage.setItem('token',response.token);
              localStorage.setItem('refreshToken',response.refreshToken);
              return true;
          })
          .catch(err => {
            console.log(`GUARDA DE ROTA - Erro ao solicitar refresh token: ${err}`);
            return false;
          });
      }else{
        return true;
      } 
    }
    /**
     * Caso não tenha o token é redirecionado para a pagina de login
     */
    this.router.navigate(['/login']);
    return false;

  }
}
