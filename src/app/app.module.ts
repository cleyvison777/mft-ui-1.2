import { GeneroModule } from './genero/genero.module';
import { FamiliaModule } from './familia/familia.module';
import { ListaEspecieModule } from './lista-especie/lista-especie.module';
import { AreaModule } from './area/area.module';
import { EmpresaModule } from './empresa/empresa.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    AppComponent
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
    ListaEspecieModule,
    FamiliaModule,
    GeneroModule

  ],
  providers: [

],
  bootstrap: [AppComponent]
})
export class AppModule { }
