import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CadastroFlorestaComponent } from './cadastro-floresta/cadastro-floresta.component';
import { PesquisaFlorestaComponent } from './pesquisa-floresta/pesquisa-floresta.component';

import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/components/messages/messages';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { CalendarModule } from 'primeng/components/calendar/calendar';
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
import {LightboxModule} from 'primeng/components/lightbox/lightbox';
import {FileUploadModule} from 'primeng/components/fileupload/fileupload';
import {DataListModule} from 'primeng/components/datalist/datalist';

@NgModule({
  declarations: [CadastroFlorestaComponent, PesquisaFlorestaComponent],
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
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,
    TableModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    LightboxModule,
    FileUploadModule,
    DataListModule
  ]
})
export class ClasseFlorestaModule { }
