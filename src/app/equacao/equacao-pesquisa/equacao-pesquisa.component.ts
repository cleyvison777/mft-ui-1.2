import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { EquacaoService, equacaoFiltro } from './../equacao.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-equacao-pesquisa',
  templateUrl: './equacao-pesquisa.component.html',
  styleUrls: ['./equacao-pesquisa.component.css']
})
export class EquacaoPesquisaComponent implements OnInit {
  filtro = new equacaoFiltro();
  totalRegistros = 0;
  empresas = [];
  equacao = []
  constructor(
    private equacaoService: EquacaoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler :ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  pesquisarEquacao(page = 0){
    this.filtro.page = page;
    this.equacaoService.pesquisar(this.filtro)
     .then(resultado => {
       this.totalRegistros = resultado.total;
       this.equacao = resultado.cadEquacao
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

aoMudarPagina(event: LazyLoadEvent){
    const page = event.first / event.rows;
    this.pesquisarEquacao(page);
  }

}
