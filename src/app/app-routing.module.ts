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
  {path: 'parcela/cadastro', component:ParceCadastroComponent},
  {path: 'parcela/:codigo', component:ParceCadastroComponent},
  {path: 'subparcela/cadastro', component:SubparcelaCadastroComponent},
  {path: 'subparcela/:codigo', component:SubparcelaCadastroComponent},

  {path: '**', redirectTo: 'pagina-nao-encontrada'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
