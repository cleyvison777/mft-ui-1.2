import { RadioButtonModule } from 'primeng/radiobutton';
import { TabMenuModule } from 'primeng/components/tabmenu/tabmenu';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { CadastroCifComponent } from './cadastro-cif/cadastro-cif.component';
import { PesquisaCifComponent } from './pesquisa-cif/pesquisa-cif.component';

import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/components/messages/messages';
import { CurrencyMaskModule } from 'ng2-currency-mask';
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
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/components/progressspinner/progressspinner';

@NgModule({
  declarations: [CadastroCifComponent, PesquisaCifComponent],
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
    CurrencyMaskModule,
    TableModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    TabMenuModule,
    ProgressSpinnerModule,
    RadioButtonModule,

  ]
})
export class CifModule { }
