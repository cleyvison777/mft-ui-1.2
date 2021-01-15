import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecieCadastroComponent } from './especie-cadastro/especie-cadastro.component';
import { EspeciePesquisaComponent } from './especie-pesquisa/especie-pesquisa.component';

@NgModule({
  declarations: [EspecieCadastroComponent, EspeciePesquisaComponent],
  imports: [
    CommonModule
  ]
})
export class ListaEspecieModule { }
