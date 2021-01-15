import { DashboardComponent } from './core/dashboard/dashboard.component';
import { CadastroAreaComponent } from './area/cadastro-area/cadastro-area.component';
import { CadastroEmpresaComponent } from './empresa/cadastro-empresa/cadastro-empresa.component';
import { AreaModule } from './area/area.module';
import { EmpresaModule } from './empresa/empresa.module';

import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

const routes: Routes = [

   {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
   {path: 'dashboard', component: DashboardComponent},
   {path: 'empresa/cadastro-empresa', component:CadastroEmpresaComponent},
   {path: 'area/cadastro-area', component: CadastroAreaComponent},
];

@NgModule({
  declarations: [
    AppComponent


  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    EmpresaModule,
    SharedModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpModule,
    AreaModule,

  ],
  providers: [

],
  bootstrap: [AppComponent]
})
export class AppModule { }
