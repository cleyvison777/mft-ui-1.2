import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneroCadastroComponent } from './genero-cadastro/genero-cadastro.component';
import { GeneroPesquisaComponent } from './genero-pesquisa/genero-pesquisa.component';

@NgModule({
  declarations: [GeneroCadastroComponent, GeneroPesquisaComponent],
  imports: [
    CommonModule
  ]
})
export class GeneroModule { }
