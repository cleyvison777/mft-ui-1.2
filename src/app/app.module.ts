import { UsoEspecieModule } from './uso-especie/uso-especie.module';
import { ClasseFlorestaModule } from './classe-floresta/classe-floresta.module';
import { GeneroModule } from './genero/genero.module';
import { FamiliaModule } from './familia/familia.module';
import { ListaEspecieModule } from './lista-especie/lista-especie.module';
import { AreaModule } from './area/area.module';
import { EmpresaModule } from './empresa/empresa.module';
import { GrupoEcologicoModule } from './grupo-ecologico/grupo-ecologico.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { MenuComponent } from './core/menu/menu.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
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
    GeneroModule,
    ClasseFlorestaModule,
    GrupoEcologicoModule,
    UsoEspecieModule

  ],
  providers: [

],
  bootstrap: [AppComponent]
})
export class AppModule { }
