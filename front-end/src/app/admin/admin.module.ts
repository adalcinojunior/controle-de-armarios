import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';

import { AdminComponent } from './admin.component';
import { ListagemComponent } from './listagem/listagem.component';
import { ConfigComponent } from './config/config.component';
import { HistoricosComponent } from './historicos/historicos.component';
import { LoginComponent } from './login/login.component';
import { Interceptor } from './auth/interceptor.module';
import { AuthService } from './auth/autenticacao.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, children:[
    { path: '', component: ListagemComponent },
    { path: 'alocacoes', component: ListagemComponent },
    { path: 'configuraçoes', component: ConfigComponent},
    { path: 'historicos', component: HistoricosComponent}
  ]}
  ];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    RouterModule.forChild(routes),
    ChartModule,
    CalendarModule
  ],
  declarations: [
    AdminComponent,
    ListagemComponent,
    ConfigComponent,
    HistoricosComponent,
    LoginComponent
  ],
  providers: [AuthService],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
