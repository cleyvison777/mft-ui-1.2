import { ConfirmationService } from 'primeng/components/common/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { EmpresaService } from './../../empresa/empresa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { EspecieService, ListaEspecieFiltro } from './../especie.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-especie-pesquisa',
  templateUrl: './especie-pesquisa.component.html',
  styleUrls: ['./especie-pesquisa.component.css']
})
export class EspeciePesquisaComponent implements OnInit {

  totalRegistrosEspecie = 0;
  listaespecie = [];
  empresas = [];
  filtro = new ListaEspecieFiltro();
  @ViewChild('tabela') grid;
  constructor(

    private listaEspecieService: EspecieService,
    private errorHandler: ErrorHandlerService,
    private cadEmpresaService: EmpresaService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,


  ) { }

  ngOnInit() {
  }

  consultarListaEspecie(page = 0) {
    this.filtro.page = page;
    this.listaEspecieService.pesquisarListaEspecie(this.filtro)
    .then(resultado => {
      this.totalRegistrosEspecie = resultado.total;
      this.listaespecie = resultado.listaespecie;

    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  //adicionando

 //excluindo
  excluindoListaEspecie(listaespecie: any){
    this.listaEspecieService.excluirListaEspecie(listaespecie.cdListaEsp)
     .then(() =>{
       if(this.grid.first === 0){
         this.consultarListaEspecie();
       } else {
         this.grid.first = 0;
         this.consultarListaEspecie();
       }
       this.toasty.success('Genero excluída com sucesso!');
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(listaespecie: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluindoListaEspecie(listaespecie);
      }
    });
  }

}
