import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class GuardsService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
    let token = localStorage.getItem("token");
    let refreshToken = localStorage.getItem("refreshToken");
    if(token && refreshToken){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
    
  }
}
