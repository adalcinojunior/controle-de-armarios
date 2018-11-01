import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicos/autenticacao.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  erro: boolean;
  constructor(
    private AutenticarServico: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  autenticar(form: NgForm) {
    this.AutenticarServico.autenticar(form.value)
      .then(response => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("refreshToken", response.refreshToken);       
        this.router.navigate(['/admin']);
      })
      .catch(err => {
        this.erro = true;
      });
  }

  hide() {
    this.erro = false;
  }

}
