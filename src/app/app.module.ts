import { CadastroModule } from './cadastro/cadastro.module';
import { CifModule } from './cif/cif.module';
import { ImpressaoFichaModule } from './impressao-ficha/impressao-ficha.module';
import { CipoModule } from './cipo/cipo.module';
import { FormaCopaModule } from './forma-copa/forma-copa.module';
import { IluminacaoModule } from './iluminacao/iluminacao.module';
import { PodridaoModule } from './podridao/podridao.module';
import { DanoModule } from './dano/dano.module';
import { GeracaoParcelaSubparcelaModule } from './geracao-parcela-subparcela/geracao-parcela-subparcela.module';
import { SubParcelaModule } from './sub-parcela/sub-parcela.module';
import { ParcelaModule } from './parcela/parcela.module';
import { SituacaoSilviculturalModule } from './situacao-silvicultural/situacao-silvicultural.module';
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
import { IdetificadoresSubparcelaSelecionadaModule } from './idetificadores-subparcela-selecionada/idetificadores-subparcela-selecionada.module';
import { TsatualtsanteriorModule } from './tsatualtsanterior/tsatualtsanterior.module';

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
    GeracaoParcelaSubparcelaModule,
    EquacaoModule,
    SituacaoSilviculturalModule,
    ParcelaModule,
    SubParcelaModule,
    IdetificadoresSubparcelaSelecionadaModule,
    DanoModule,
    PodridaoModule,
    IluminacaoModule,
    FormaCopaModule,
    CipoModule,
    ImpressaoFichaModule,
    TsatualtsanteriorModule,
    CifModule,
    CadastroModule



  ],
  providers: [

],
  bootstrap: [AppComponent]
})
export class AppModule { }
