import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { MenuService } from './menu/menu.service';
import { Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandlerService } from './error-handler.service';
import { ToastyModule } from 'ng2-toasty';
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';


import { AreaService } from './../area/area.service';
import { EmpresaService } from './../empresa/empresa.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    CommonModule,
    ToastyModule,
    ConfirmDialogModule,
    MenubarModule,
    MenuModule,
    DropdownModule,
    FormsModule
  ],
  exports:[
    NavbarComponent,
    DashboardComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers:[
    ErrorHandlerService,
    EmpresaService,
    AreaService,
    ConfirmationService,
    Title,
    MenuService
  ]
})
export class CoreModule { }
