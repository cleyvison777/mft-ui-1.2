import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { PesquisaEmpresaComponent } from './pesquisa-empresa/pesquisa-empresa.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [


  {path: 'empresa', component:PesquisaEmpresaComponent},
  {path: 'empresa/cadastro', component:CadastroEmpresaComponent},
  {path: 'empresa/:codigo', component:CadastroEmpresaComponent},

];


@NgModule({

  imports: [

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EmpresaRoutingModule { }
