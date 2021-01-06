import { AreaService } from './area/area.service';
import { AreaModule } from './area/area.module';
import { EmpresaService } from './empresa/empresa.service';
import { EmpresaModule } from './empresa/empresa.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { ToastyModule } from 'ng2-toasty';




@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EmpresaModule,
    SharedModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpModule,
    AreaModule,
    ToastyModule.forRoot(),






  ],
  providers: [
  EmpresaService,
  AreaService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
