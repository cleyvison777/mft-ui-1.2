import { GeneroCadastroComponent } from './genero/genero-cadastro/genero-cadastro.component';
import { GeneroPesquisaComponent } from './genero/genero-pesquisa/genero-pesquisa.component';
import { CadastroFamiliaComponent } from './familia/cadastro-familia/cadastro-familia.component';
import { PesquisaFamiliaComponent } from './familia/pesquisa-familia/pesquisa-familia.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { CadastroAreaComponent } from './area/cadastro-area/cadastro-area.component';
import { CadastroEmpresaComponent } from './empresa/cadastro-empresa/cadastro-empresa.component';
import { PesquisaEmpresaComponent } from './empresa/pesquisa-empresa/pesquisa-empresa.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},

  {path: 'empresa', component:PesquisaEmpresaComponent},
  {path: 'empresa/cadastro', component:CadastroEmpresaComponent},
  {path: 'empresa/:codigo', component:CadastroEmpresaComponent},
  {path: 'area/cadastro-area', component: CadastroAreaComponent},
  {path: 'area/:codigo', component: CadastroAreaComponent},
  {path: 'familia', component:PesquisaFamiliaComponent},
  {path: 'familia/cadastro', component:CadastroFamiliaComponent},
  {path: 'familia/:codigo', component:CadastroFamiliaComponent},
  {path: 'genero', component:GeneroPesquisaComponent},
  {path: 'genero/cadastro', component:GeneroCadastroComponent},
  {path: 'genero/:codigo', component:GeneroCadastroComponent},

  {path: 'dashboard', component: DashboardComponent},
  {path: '**', redirectTo: 'pagina-nao-encontrada'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
