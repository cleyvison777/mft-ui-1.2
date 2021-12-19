import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CipoCadastroComponent } from './cipo-cadastro/cipo-cadastro.component';
import { CipoPesquisaComponent } from './cipo-pesquisa/cipo-pesquisa.component';

@NgModule({
  declarations: [CipoCadastroComponent, CipoPesquisaComponent],
  imports: [
    CommonModule
  ]
})
export class CipoModule { }
