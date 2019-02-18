import { Component, OnInit } from '@angular/core';
import { AlocacaoService } from '../../servicos/alocacao.service';

@Component({
  selector: 'admin-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  private listaReservas = [];
  private buscando;
  private rows = 5;
  private cols = [
    { field: 'userName', header: 'Nome' },
    { field: 'codeKey', header: 'Chave' },
    { field: 'entryDate.date', header: 'Data de Entrada' },
    { field: 'entryDate.hour', header: 'Hora de Entrada' },
    { field: 'status', header: 'Status' },
    { field: 'devolutionDate.date', header: 'Data de Devolução' },
    { field: 'devolutionDate.hour', header: 'Hora de Devolução' }
  ];

  constructor(private alocacaoService: AlocacaoService) { }

  ngOnInit() {
    this.alocacaoService.buscarTodas()
      .then((lista) => {
        this.listaReservas = lista;
      })
      .catch((err) => {
        console.error('Ocorreu erro no carregamento da listagem!' + err);
      });
  }

  pesquisar(evento: any) {
    let busca: string = evento.target.value;
    busca = busca.toUpperCase();
    clearTimeout(this.buscando);
    this.buscando = setTimeout(() => {
      this.alocacaoService.buscar('?query='+busca)
        .then((lista) => {
          this.listaReservas = lista;
        })
        .catch((err) => {
          console.log(`Problemas na busca - ${err}`);
        })
    }, 250);

  }


}
