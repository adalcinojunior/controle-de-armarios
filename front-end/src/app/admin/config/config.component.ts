import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { AlocacaoService } from 'src/app/servicos/alocacao.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  modaldeletar: boolean
  status = {
    count: 0,
    avgObjSize: 0,
    storageSize: 0,
    size: 0
  };
  armazenamento: any;  
  
  constructor(private AlocacaoService: AlocacaoService, private messageService: MessageService) {
        
    this.status.count = 0;
    this.status.avgObjSize = 0;
    this.status.storageSize = 0;
    this.status.size = 0;
  }

  ngOnInit() {
    this.carregarStatus();
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

  deletarAll(){
    this.AlocacaoService.deletarTodos()
      .then(() => {
        this.hideModalDeletar();
        this.carregarStatus();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showModalDeletar(){
    this.modaldeletar = true;
  }

  hideModalDeletar(){
    this.modaldeletar = false;
  }
  

}
