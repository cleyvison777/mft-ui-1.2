import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SilviculturalCadastroComponent } from './silvicultural-cadastro/silvicultural-cadastro.component';
import { SilviculturalPesquisaComponent } from './silvicultural-pesquisa/silvicultural-pesquisa.component';

import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/components/messages/messages';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldsetModule } from 'primeng/fieldset';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TableModule } from 'primeng/components/table/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { MultiSelectModule } from 'primeng/multiselect';
import { AppRoutingModule } from './../app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {PanelModule} from 'primeng/components/panel/panel';

@NgModule({
  declarations: [SilviculturalCadastroComponent, SilviculturalPesquisaComponent],
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
    DropdownModule,
    TableModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    MultiSelectModule,
    PanelModule,
    FieldsetModule
  ],

})
export class SituacaoSilviculturalModule { }
