import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra-menu',
  templateUrl: './barra-menu.component.html',
  styleUrls: ['./barra-menu.component.css']
})
export class BarraMenuComponent {
  private menuLateral = false;
  exibirMenu() {
    this.menuLateral = !this.menuLateral;
  }


}
