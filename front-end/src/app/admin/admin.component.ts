import { AlocacaoService } from '../servicos/alocacao.service';
import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private listaReservas = [];
  private buscando;
  private rows = 5;
  private cols = [
    { field: 'userName', header: 'Nome' },
    { field: 'codeKey', header: 'Chave' },
    { field: 'entryDate', header: 'Data de Entrada' },
    { field: 'status', header: 'Status' },
    { field: 'devolutionDate', header: 'Data de Devolução' }
  ];
  constructor(private router: Router) { }

  ngOnInit() {
    
  }  

  logout() {
    localStorage.clear();
    this.router.navigate(['home']);
  }

  mostar(dt: any) {
    console.log(dt.exportCSV())
  }

}
