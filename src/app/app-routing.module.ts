import { FichaTemporarioComponent } from './ficha-campo-temporario/ficha-temporario/ficha-temporario.component';
import { QualidadeCadastroComponent } from './qualidade-fuste/qualidade-cadastro/qualidade-cadastro.component';
import { AmostraCadastroComponent } from './tipo-amostra/amostra-cadastro/amostra-cadastro.component';
import { CadastroComponent } from './cadastro/cadastro/cadastro.component';
import { CadastroCifComponent } from './cif/cadastro-cif/cadastro-cif.component';
import { TsatualtsanteriorCadastroComponent } from './tsatualtsanterior/tsatualtsanterior-cadastro/tsatualtsanterior-cadastro.component';
import { ImpressaoFichaCampoComponent } from './impressao-ficha/impressao-ficha-campo/impressao-ficha-campo.component';
import { CipoCadastroComponent } from './cipo/cipo-cadastro/cipo-cadastro.component';
import { FormaCadastroComponent } from './forma-copa/forma-cadastro/forma-cadastro.component';
import { IluminacaoCadastroComponent } from './iluminacao/iluminacao-cadastro/iluminacao-cadastro.component';
import { PodridaoCadastroComponent } from './podridao/podridao-cadastro/podridao-cadastro.component';
import { DanoCadastroComponent } from './dano/dano-cadastro/dano-cadastro.component';
import { CadastroGeracaoParcelaComponent } from './geracao-parcela-subparcela/cadastro-geracao-parcela/cadastro-geracao-parcela.component';
import { EspecieCadastroComponent } from './lista-especie/especie-cadastro/especie-cadastro.component';
import { IdentificadorCadastroComponent } from './idetificadores-subparcela-selecionada/identificador-cadastro/identificador-cadastro.component';
import { SubparcelaCadastroComponent } from './sub-parcela/subparcela-cadastro/subparcela-cadastro.component';
import { ParceCadastroComponent } from './parcela/parce-cadastro/parce-cadastro.component';
import { SilviculturalCadastroComponent } from './situacao-silvicultural/silvicultural-cadastro/silvicultural-cadastro.component';
import { TamanhoCadastroComponent } from './classe-tamanho/tamanho-cadastro/tamanho-cadastro.component';
import { ParcelaCadastroComponent } from './tipo-parcela/parcela-cadastro/parcela-cadastro.component';
import { MedicaoCadastroComponent } from './medicao/medicao-cadastro/medicao-cadastro.component';
import { ClasseTamanhoCadastroComponent } from './classe-tamanho-individuo/classe-tamanho-cadastro/classe-tamanho-cadastro.component';
import { ProtecaoCadastroComponent } from './categoria-protecao/protecao-cadastro/protecao-cadastro.component';
import { CadastroEspecieComponent } from './uso-especie/cadastro-especie/cadastro-especie.component';
import { GrupoCadastroComponent } from './grupo-ecologico/grupo-cadastro/grupo-cadastro.component';
import { CadastroFlorestaComponent } from './classe-floresta/cadastro-floresta/cadastro-floresta.component';
import { GeneroCadastroComponent } from './genero/genero-cadastro/genero-cadastro.component';
import { CadastroFamiliaComponent } from './familia/cadastro-familia/cadastro-familia.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { CadastroAreaComponent } from './area/cadastro-area/cadastro-area.component';
import { CadastroEmpresaComponent } from './empresa/cadastro-empresa/cadastro-empresa.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},

  {path: 'dashboard', component:DashboardComponent},
  {path: 'empresa/cadastro', component:CadastroEmpresaComponent},
  {path: 'empresa/:codigo', component:CadastroEmpresaComponent},
  {path: 'area/cadastro-area', component: CadastroAreaComponent},
  {path: 'area/:codigo', component: CadastroAreaComponent},
  {path: 'familia/cadastro', component:CadastroFamiliaComponent},
  {path: 'familia/:codigo', component:CadastroFamiliaComponent},
  {path: 'genero/cadastro', component:GeneroCadastroComponent},
  {path: 'genero/:codigo', component:GeneroCadastroComponent},
  {path: 'floresta/cadastro', component:CadastroFlorestaComponent},
  {path: 'floresta/:codigo', component:CadastroFlorestaComponent},
  {path: 'grupo-ecologico/cadastro', component:GrupoCadastroComponent},
  {path: 'grupo-ecologico/:codigo', component:GrupoCadastroComponent},
  {path: 'uso-especie/cadastro', component:CadastroEspecieComponent},
  {path: 'uso-especie/:codigo', component:CadastroEspecieComponent},
  {path: 'categoria-protecao/cadastro', component:ProtecaoCadastroComponent},
  {path: 'categoria-protecao/:codigo', component:ProtecaoCadastroComponent},
  {path: 'classe-tamanho-individuo/cadastro', component:ClasseTamanhoCadastroComponent},
  {path: 'classe-tamanho-individuo/:codigo', component:ClasseTamanhoCadastroComponent},
  {path: 'medicao/cadastro', component:MedicaoCadastroComponent},
  {path: 'medicao/:codigo', component:MedicaoCadastroComponent},
  {path: 'tipo-parcela/cadastro', component:ParcelaCadastroComponent},
  {path: 'tipo-parcela/:codigo', component:ParcelaCadastroComponent},
  {path: 'classe-tamanho/cadastro', component:TamanhoCadastroComponent},
  {path: 'classe-tamanho/:codigo', component:TamanhoCadastroComponent},
  {path: 'situacao-silvicultural/cadastro', component:SilviculturalCadastroComponent},
  {path: 'situacao-silvicultural/:codigo', component:SilviculturalCadastroComponent},
  {path: 'mediacoes-anteriores/cadastro', component:TsatualtsanteriorCadastroComponent},
  {path: 'mediacoes-anteriores/:codigo', component:TsatualtsanteriorCadastroComponent},
  {path: 'parcela/cadastro', component:ParceCadastroComponent},
  {path: 'parcela/:codigo', component:ParceCadastroComponent},
  {path: 'subparcela/cadastro', component:SubparcelaCadastroComponent},
  {path: 'subparcela/:codigo', component:SubparcelaCadastroComponent},
  {path: 'idetificadores-subparcela-selecionada/cadastro', component:IdentificadorCadastroComponent},
  {path: 'idetificadores-subparcela-selecionada/:codigo', component:IdentificadorCadastroComponent},
  {path: 'geracao-parcela/cadastro', component:CadastroGeracaoParcelaComponent},
  {path: 'geracao-parcela/:codigo', component:CadastroGeracaoParcelaComponent},
  {path: 'dano/cadastro', component:DanoCadastroComponent},
  {path: 'dano/:codigo', component:DanoCadastroComponent},
  {path: 'podridao/cadastro', component:PodridaoCadastroComponent},
  {path: 'podridao/:codigo', component:PodridaoCadastroComponent},
  {path: 'iluminacao/cadastro', component:IluminacaoCadastroComponent},
  {path: 'iluminacao/:codigo', component:IluminacaoCadastroComponent},
  {path: 'forma-copa/cadastro', component:FormaCadastroComponent},
  {path: 'forma-copa/:codigo', component:FormaCadastroComponent},
  {path: 'cipo/cadastro', component:CipoCadastroComponent},
  {path: 'cipo/:codigo', component:CipoCadastroComponent},
  {path: 'impressao-ficha', component:ImpressaoFichaCampoComponent},
  {path: 'lista-especie/cadastro', component:EspecieCadastroComponent},
  {path: 'lista-especie/:codigo', component:EspecieCadastroComponent},
  {path: 'identificacao-fuste/cadastro', component:CadastroCifComponent},
  {path: 'identificacao-fuste/:codigo', component:CadastroCifComponent},
  {path: 'cadastro/cadastro', component:CadastroComponent},
  {path: 'cadastro/:codigo', component:CadastroComponent},
  {path: 'tipo-amostra/cadastro', component:AmostraCadastroComponent},
  {path: 'tipo-amostra/:codigo', component:AmostraCadastroComponent},
  {path: 'qualidade-fuste/cadastro', component:QualidadeCadastroComponent},
  {path: 'qualidade-fuste/:codigo', component:QualidadeCadastroComponent},
  {path: 'impressao-temporario', component:FichaTemporarioComponent},
  {path: '**', redirectTo: 'pagina-nao-encontrada'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
