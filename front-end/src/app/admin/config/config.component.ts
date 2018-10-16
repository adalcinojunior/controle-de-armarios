import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { AlocacaoService } from 'src/app/servicos/alocacao.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  years = [];
  status = {
    count: 0,
    avgObjSize: 0,
    storageSize: 0,
    size: 0
  };
  ano: any = new Date().getFullYear().toString();
  armazenamento: any;
  historico: any;
  constructor(private AlocacaoService: AlocacaoService, private messageService: MessageService) {
    this.status.count = 0;
    this.status.avgObjSize = 0;
    this.status.storageSize = 0;
    this.status.size = 0;
    let anoAtual = this.ano;
    for(let i = 1; i < 10; i++){
      this.years.push(<number>this.ano-i);
    }
    let ano = this.ano;
    for(let i = 1; i < 10; i++){
      this.years.push(ano++);
    }
    this.years = this.years.sort();
  }

  ngOnInit() {
    this.carregarStatus();
    this.montarHistorico();
  }

  carregarStatus() {
    this.AlocacaoService.status()
      .then((data) => {
        this.status = data;
        this.montarArmazenamento();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  montarArmazenamento() {
    this.armazenamento = {
      labels: ['Espaço alocado', 'Tamanho atual'],
      datasets: [
        {
          data: [this.status.storageSize, this.status.size],
          backgroundColor: [
            "#FF6384",
            "#36A2EB"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB"
          ]
        }]
    };
  }

  montarHistorico() {
    this.AlocacaoService.quantidadePorMes(this.ano)
      .then((data)=>{
        this.historico = {
          labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          datasets: [
            {
              label: 'Quantidade de registros',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: data
            }
          ]
        }
      });
    
    
  
    
  }

}
