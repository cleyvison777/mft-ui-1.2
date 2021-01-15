import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandlerService } from './error-handler.service';
import { ToastyModule } from 'ng2-toasty';
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';


import { AreaService } from './../area/area.service';
import { EmpresaService } from './../empresa/empresa.service';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ToastyModule,
    ConfirmDialogModule,
    MenubarModule,
    MenuModule
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
    ConfirmationService
  ]
})
export class CoreModule { }
