import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';

import { AdminComponent } from './admin.component';
import { ListagemComponent } from './listagem/listagem.component';
import { ConfigComponent } from './config/config.component';
const routes: Routes = [
  { path: 'admin', component: AdminComponent, children:[
    { path: '', component: ListagemComponent },
    { path: 'allocations', component: ListagemComponent },
    { path: 'config', component: ConfigComponent}
  ]}
  ];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AdminComponent,
    ListagemComponent,
    ConfigComponent
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
