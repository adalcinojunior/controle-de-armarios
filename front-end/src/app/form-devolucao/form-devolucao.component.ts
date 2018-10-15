import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { AlocacaoService } from '../servicos/alocacao.service';
import { ComunicacaoService } from '../servicos/comunicacao.service';

class Devolucao {
  userName: string = null;
  codeKey: string;
}

@Component({
  selector: 'app-form-devolucao',
  templateUrl: './form-devolucao.component.html',
  styleUrls: ['./form-devolucao.component.css']
})
export class FormDevolucaoComponent implements OnInit {
  private devolucao = new Devolucao();
  private listaReservas = [];
  private users = [];
  private carregando: boolean = false;
  
  constructor(private alocacaoService: AlocacaoService, private messageService: MessageService, private comunicacao: ComunicacaoService) {
    this.comunicacao.alocacao.subscribe(() => {
      this.carregarListaUsuarios();
    });
  }

  ngOnInit() { this.carregarListaUsuarios(); }

  carregarListaUsuarios(): void {
    this.alocacaoService.buscarTodas()
      .then((lista) => {
        this.listaReservas = lista;
        this.users = [{label:' - - - Selecione - - - ',value:null}];
        this.listaReservas.forEach((allocation: any) => {
          if (allocation.status === 'OCUPADO') {
            this.users.push({label:allocation.userName,value:allocation.userName});
          }
        });
      })
      .catch((err) => {
        console.error('Ocorreu erro no carregamento dos usuarios!' + err);
      });
  }

  devolver(form: NgForm): void {
    this.carregando = true;
    this.alocacaoService.devolver(this.devolucao)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: '', detail: 'Devoluçao realizada com sucesso!' });
        form.reset();
        this.comunicacao.alocacaoDevolvida();
        this.carregando = false;
      })
      .catch((err) => {
        this.messageService.add({ severity: 'error', summary: '', detail: 'Erro em devolver chave!' });
        console.error(`Erro em devolver chave: ${err.message}`);
        this.carregando = false;
      });
  }

  limpar(form: NgForm): void {
    form.reset();
  }


}
