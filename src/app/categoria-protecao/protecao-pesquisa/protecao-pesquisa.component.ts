import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaFiltro, CategoriaProtecaoService } from './../categoria-protecao.service';
import { CadCategoriaProtecao } from './../../core/model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-protecao-pesquisa',
  templateUrl: './protecao-pesquisa.component.html',
  styleUrls: ['./protecao-pesquisa.component.css']
})
export class ProtecaoPesquisaComponent implements OnInit {
  totalRegistrosCategoriaProtecao = 0;
  listaCategoriaProtecao = [];
  cadCategoriaProtecao = new CadCategoriaProtecao;
  filtroCategoria = new CategoriaFiltro();
  @ViewChild('tabela') grid;



  constructor(
    private categoriaProtecaoService: CategoriaProtecaoService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
  ) { }

  ngOnInit() {
  }


  consultaCategoriaProtecao(page = 0) {
    this.filtroCategoria.page = page;
     this.categoriaProtecaoService.consulta(this.filtroCategoria)
     .then(resultado => {
       this.totalRegistrosCategoriaProtecao = resultado.total;
       this.listaCategoriaProtecao = resultado.listaCategoriaProtecao;
     })
     .catch(erro => this.errorHandler.handle(erro));
  }
  aoMudarPaginaCategoriaProtecao(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.consultaCategoriaProtecao(page);
  }


  excluirCategoria(listaCategoriaProtecao: any) {
    this.categoriaProtecaoService.excluir(listaCategoriaProtecao.cdCategoriaProtecao)
     .then(() =>{
       if (this.grid.first === 0) {
        this.consultaCategoriaProtecao();
       } else {
        this.grid.first = 0;
        this.consultaCategoriaProtecao();

       }
       this.toasty.success('Categoria Protecao excluída com sucesso!');
     })
     .catch(erro => this.errorHandler.handle(erro));

  }

  confirmarExclusao(listaCategoriaProtecao: any){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
       this.excluirCategoria(listaCategoriaProtecao);
      }
    });
  }
}
