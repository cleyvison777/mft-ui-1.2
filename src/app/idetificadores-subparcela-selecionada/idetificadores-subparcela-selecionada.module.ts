import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentificadorCadastroComponent } from './identificador-cadastro/identificador-cadastro.component';
import { IdentificadorPesquisaComponent } from './identificador-pesquisa/identificador-pesquisa.component';


import { TabMenuModule } from 'primeng/components/tabmenu/tabmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/components/messages/messages';
import { TableModule } from 'primeng/components/table/table';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldsetModule } from 'primeng/fieldset';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { AppRoutingModule } from './../app-routing.module';
import { FormsModule } from '@angular/forms';
import {EditorModule} from 'primeng/components/editor/editor';
import { BrowserModule } from '@angular/platform-browser';
import { PanelModule } from 'primeng/components/panel/panel';

@NgModule({
  declarations: [IdentificadorCadastroComponent, IdentificadorPesquisaComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TabViewModule,
    InputTextModule,
    SelectButtonModule,
    DataTableModule,
    TooltipModule,
    FieldsetModule,
    BrowserAnimationsModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,
    CurrencyMaskModule,
    TableModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    CheckboxModule,
    TabMenuModule,
    EditorModule,
    PanelModule
  ]
})
export class IdetificadoresSubparcelaSelecionadaModule { }
