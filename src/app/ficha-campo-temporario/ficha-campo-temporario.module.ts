import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaTemporarioComponent } from './ficha-temporario/ficha-temporario.component';

import { TabMenuModule } from 'primeng/components/tabmenu/tabmenu';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/components/messages/messages';
import { CurrencyMaskModule } from 'ng2-currency-mask';
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
import { AppRoutingModule } from './../app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {DialogModule} from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/components/progressspinner/progressspinner';
import {RadioButtonModule} from 'primeng/radiobutton';


@NgModule({
  declarations: [FichaTemporarioComponent],
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
    DialogModule,
    TabMenuModule,
    ProgressSpinnerModule,
    RadioButtonModule
  ]
})
export class FichaCampoTemporarioModule { }
