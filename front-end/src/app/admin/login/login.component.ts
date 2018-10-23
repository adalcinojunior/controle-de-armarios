import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicos/autenticacao.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private AutenticarServico: AuthService, private router: Router) { }

  ngOnInit() {
  }

  autenticar(form: NgForm){
    this.AutenticarServico.autenticar(form.value)
      .then(response => { 
        response = response.json();
        localStorage.setItem("token",response.token);
        localStorage.setItem("refreshToken",response.refreshToken);
        this.router.navigate(['/admin']);
      })
      .catch(err => {
        console.log(err.json());
      });
  }

}
