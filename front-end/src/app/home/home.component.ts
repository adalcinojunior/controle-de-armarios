import { Component, OnInit } from '@angular/core';
import { AlocacaoService } from '../servicos/alocacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
      
  private estadoAlocacao = 'active';
  private estadoDevolucao = '';
  
  constructor(private alocacaoService: AlocacaoService) { }

  ngOnInit() {
    
  }

  mostrarAlocacao(): void {
    this.estadoAlocacao = 'active';
    this.estadoDevolucao = '';
  }

  mostrarDevolucao(): void {
    this.estadoDevolucao = 'active';
    this.estadoAlocacao = '';
  }
}
