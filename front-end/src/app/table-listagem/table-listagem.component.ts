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
    
    this.alocacaoService.buscar('?date='+this.data.toLocaleDateString())
      .then((lista) => {
        if(lista){
          this.listaReservas = lista;
        }
      })
      .catch((err) => {
        if(err.status !== 0){
          this.messageService.add({severity: 'error', summary: 'Error: ', detail: err.message});
        }else{
          this.conexaoFail = true;
        }
      });
  }

}
