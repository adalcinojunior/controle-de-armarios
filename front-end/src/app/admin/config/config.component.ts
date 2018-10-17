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
  armazenamento: any;
  historicoAnual: any;
  historicoMensal: any;
  historicoSemanal: any;
  ano: any = new Date().getFullYear().toString();

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
    this.montarHistoricoAnual(new Date().getFullYear().toString());
    this.montarHistoricoMensal(new Date().getMonth().toString());
    this.montarHistoricoDiario(new Date().getDay().toString());
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

  montarHistoricoAnual(ano: string) {
    this.AlocacaoService.quantidadePorMes(ano)
      .then((data)=>{
        this.historicoAnual = {
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

  montarHistoricoMensal(mes: string) {
    this.AlocacaoService.quantidadePorMes(mes)
      .then((data)=>{
        this.historicoMensal = {
          labels: ['01', '02', 'Março', '03', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
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

  montarHistoricoDiario(dia: string) {
    this.AlocacaoService.quantidadePorMes(dia)
      .then((data)=>{
        this.historicoSemanal = {
          labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00','07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00','14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
          datasets: [
            {
              label: 'Quantidade de registros',
              backgroundColor: '#BDBDBD',
              borderColor: '#2E2E2E',
              data: [1,2,3,4,5,6,7,8]
            }
          ]
        }
      });   
  }

}
