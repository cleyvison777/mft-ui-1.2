import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmostraCadastroComponent } from './amostra-cadastro/amostra-cadastro.component';
import { AmostraPesquisaComponent } from './amostra-pesquisa/amostra-pesquisa.component';

import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/components/messages/messages';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldsetModule } from 'primeng/fieldset';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TableModule } from 'primeng/components/table/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { AppRoutingModule } from './../app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [AmostraCadastroComponent, AmostraPesquisaComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TabViewModule,
    InputTextModule,
    SelectButtonModule,
    DataTableModule,
    DataTableModule,
    TooltipModule,
    FieldsetModule,
    BrowserAnimationsModule,
    SelectButtonModule,
    TableModule,
    MessagesModule,
    MessageModule,
    ButtonModule,

  ]
})
export class TipoAmostraModule { }
