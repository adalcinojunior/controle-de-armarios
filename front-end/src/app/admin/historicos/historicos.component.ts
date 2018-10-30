import { Component, OnInit } from '@angular/core';
import { AlocacaoService } from 'src/app/servicos/alocacao.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-historicos',
  templateUrl: './historicos.component.html',
  styleUrls: ['./historicos.component.css']
})
export class HistoricosComponent implements OnInit {

  years = [];
  historicoAnual: any;
  historicoMensal: any;
  historicoSemanal: any;
  dataAtual = new Date();
  pt: any;
  
  constructor(private AlocacaoService: AlocacaoService, private messageService: MessageService) {
    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    };
    
    let ano: any = new Date().getFullYear().toString();
    for (let i = 0; i < 10; i++) {
      this.years.push(<number>ano - i);
    }
    ano = new Date().getFullYear().toString();
    
    this.years = this.years.sort();
  }

  ngOnInit() {
    const date = new Date().toLocaleDateString().split('/');
    this.montarHistoricoAnual(date[2]);
    this.montarHistoricoMensal(date[1] + '/' + date[2]);
    this.montarHistoricoDiario(date[0] + '/' + date[1] + '/' + date[2]);
  }

  
  buscarPorDate(date: string): Promise<any>{
    return this.AlocacaoService.buscar('?date=' + date)
      .then(response => response)
      .catch(err => Promise.reject(err));
  }

  montarHistoricoAnual(ano: string) {
    this.buscarPorDate(ano)
      .then((allocations) => {
        
        let data = [0,0,0,0,0,0,0,0,0,0,0,0];
        allocations.forEach((element: any) => {
          let index: number = parseInt(element.entryDate.date.substring(3, 5));
          data[index-1]++;
        });

        this.historicoAnual = {
          labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          datasets: [
            {
              label: 'Quantidade de registros',
              borderColor: '#1E88E5',
              data: data
            }
          ]
        }
      })
      .catch((err) => {
        console.log(`Erro ao montar historico anual ${err}`);
      });
  }
  atualizarHistoricoMensal(date: Date){
    let mes = date.toLocaleDateString().substring(3);
    this.montarHistoricoMensal(mes);
  }
  montarHistoricoMensal(mes: string) {
    this.buscarPorDate(mes)
      .then((allocations)=>{

        let data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        allocations.forEach((element: any) => {
          let index: number = parseInt(element.entryDate.date.substring(0, 2));
          data[index-1]++;
        });

        this.historicoMensal = {
          labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30','31'],
          datasets: [
            {
              label: 'Quantidade de registros',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: data
            }
          ]
        }
      })
      .catch((err)=>{
        console.log(`Erro ao montar historico mensal ${err}`);
      });
  }

  atualizarHistoricoDiario(date: Date){
    this.montarHistoricoDiario(date.toLocaleDateString());
  }
  montarHistoricoDiario(dia: string) {
    this.buscarPorDate(dia)
      .then((allocations)=>{

        let data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        allocations.forEach((element: any) => {
          let index: number = parseInt(element.entryDate.hour.substring(0, 5));
          data[index-1]++;
        });

        this.historicoSemanal = {
          labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
          datasets: [
            {
              label: 'Quantidade de registros',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: data
            }
          ]
        }
      })
      .catch((err)=>{
        console.log(`Erro ao montar historico diario ${err}`);
      });
  }

}
