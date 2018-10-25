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
import { GuardsService } from './guards/guards.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate:[GuardsService], children:[
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
    CalendarModule,
    Interceptor
  ],
  declarations: [
    AdminComponent,
    ListagemComponent,
    ConfigComponent,
    HistoricosComponent,
    LoginComponent
  ],
  providers: [AuthService, GuardsService],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
