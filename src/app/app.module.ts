import { GeracaoParcelaSubparcelaModule } from './geracao-parcela-subparcela/geracao-parcela-subparcela.module';
import { EquacaoModule } from './equacao/equacao.module';
import { ClasseTamanhoModule } from './classe-tamanho/classe-tamanho.module';
import { TipoParcelaModule } from './tipo-parcela/tipo-parcela.module';
import { MedicaoModule } from './medicao/medicao.module';
import { ClasseTamanhoIndividuoModule } from './classe-tamanho-individuo/classe-tamanho-individuo.module';
import { UsoEspecieModule } from './uso-especie/uso-especie.module';
import { ClasseFlorestaModule } from './classe-floresta/classe-floresta.module';
import { GeneroModule } from './genero/genero.module';
import { FamiliaModule } from './familia/familia.module';
import { ListaEspecieModule } from './lista-especie/lista-especie.module';
import { AreaModule } from './area/area.module';
import { EmpresaModule } from './empresa/empresa.module';
import { GrupoEcologicoModule } from './grupo-ecologico/grupo-ecologico.module';
import { CategoriaProtecaoModule } from './categoria-protecao/categoria-protecao.module';
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
    UsoEspecieModule,
    CategoriaProtecaoModule,
    ClasseTamanhoIndividuoModule,
    MedicaoModule,
    TipoParcelaModule,
    ClasseTamanhoModule,
    EquacaoModule,



  ],
  providers: [

],
  bootstrap: [AppComponent]
})
export class AppModule { }
