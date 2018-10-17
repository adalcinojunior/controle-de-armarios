import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlocacaoService } from '../servicos/alocacao.service';
import { MessageService } from 'primeng/api';
import { ComunicacaoService } from '../servicos/comunicacao.service';


@Component({
  selector: 'app-form-alocacao',
  templateUrl: './form-alocacao.component.html',
  styleUrls: ['./form-alocacao.component.css']
})
export class FormAlocacaoComponent implements OnInit {  
  private carregando: boolean = false;
  private chave: string;
  private nome: string;
  private email: string;
  
  constructor(private alocacaoService: AlocacaoService, private messageService: MessageService, private comunicacao: ComunicacaoService) { }

  ngOnInit() {
    
  }

  salvar(form: NgForm): void {
    let date = new Date();
    this.carregando = true;
    this.alocacaoService.salvar({userName: this.nome.toUpperCase(), codeKey: this.chave, email: this.email, status: 'OCUPADO', entryDate: { date:date.toLocaleDateString(), hour:date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()}})
      .then(response => {
        this.limpar(form);
        this.messageService.add({severity: 'success', summary: '', detail: 'Alocação realizada com sucesso!'});
        this.comunicacao.alocacaoSalva();
        this.carregando = false;
      })
      .catch((err) => {
        if(err.status !== 0){
          let body = JSON.parse(err._body);
          this.messageService.add({severity: 'error', summary: 'Error: ', detail: body.message});
        }else{
          this.messageService.add({severity: 'error', summary: 'Conexão recusada: ', detail: 'Não foi possivel acessar os dados!'});
        }
        this.carregando = false;
      });
  }  

  limpar(form: NgForm): void {
    form.reset();
  }

}
