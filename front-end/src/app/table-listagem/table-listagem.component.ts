import { Component, OnInit, Input } from '@angular/core';

import { ComunicacaoService } from '../servicos/comunicacao.service';
import { AlocacaoService } from '../servicos/alocacao.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-table-listagem',
  templateUrl: './table-listagem.component.html',
  styleUrls: ['./table-listagem.component.css']
})
export class TableListagemComponent implements OnInit {
  private data:Date;
  private listaReservas = [];
  private conexaoFail: boolean = false;
  constructor(private alocacaoService: AlocacaoService, private comunicacao: ComunicacaoService, private messageService: MessageService) { 
    this.comunicacao.alocacao.subscribe(()=>{
      this.carregarListaReservas();
    });
    this.data = new Date();
  }

  ngOnInit() { this.carregarListaReservas(); }

  carregarListaReservas(): void {
    let temp = this.data.toLocaleDateString().split('/');
    this.alocacaoService.buscar(temp[2]+'-'+temp[1]+'-'+temp[0])
      .then((lista) => {
        this.listaReservas = lista;
      })
      .catch((err) => {
        if(err.status !== 0){
          let body = JSON.parse(err._body);
          this.messageService.add({severity: 'error', summary: 'Error: ', detail: body.message});
        }else{
          this.conexaoFail = true;
        }
      });
  }

}
