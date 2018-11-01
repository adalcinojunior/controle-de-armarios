import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

import { AppComponent } from './app.component';
import { FormAlocacaoComponent } from './form-alocacao/form-alocacao.component';
import { AlocacaoService } from './servicos/alocacao.service';
import { BarraMenuComponent } from './barra-menu/barra-menu.component';
import { FormDevolucaoComponent } from './form-devolucao/form-devolucao.component';
import { ComunicacaoService } from './servicos/comunicacao.service';
import { TableListagemComponent } from './table-listagem/table-listagem.component';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';
import { AdminModule } from './admin/admin.module';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminModule },
  { path: '**', redirectTo: 'home'},
  ];
  
@NgModule({
  declarations: [
    AppComponent,
    FormAlocacaoComponent,
    BarraMenuComponent,
    FormDevolucaoComponent,
    TableListagemComponent,
    HomeComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    HttpClientModule,
    
    TableModule,
    ToastModule,
    DropdownModule,
    CalendarModule,
    
    AdminModule,
  ],
  providers: [AlocacaoService, MessageService, ComunicacaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
