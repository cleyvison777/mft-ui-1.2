import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ClasseFlorestaFiltro, FlorestaService } from './../floresta.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pesquisa-floresta',
  templateUrl: './pesquisa-floresta.component.html',
  styleUrls: ['./pesquisa-floresta.component.css']
})
export class PesquisaFlorestaComponent implements OnInit {

  filtro = new ClasseFlorestaFiltro();
  totalRegistros = 0;
  empresas = [];
  floresta =[];
  @ViewChild('tabela') grid;

  constructor(
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler :ErrorHandlerService,
    private florestaService: FlorestaService,
  ) { }

  ngOnInit() {
  }

  pesquisaFloresta(page = 0) {
   this.filtro.page = page;
    this.florestaService.pesquisar(this.filtro)
     .then(resultado =>{
        this.totalRegistros = resultado.total;
        this.floresta = resultado.classeFloresta;
     })

     .catch(erro => this.errorHandler.handle(erro));
  }


  aoMudarPagina(event: LazyLoadEvent){
    const page = event.first / event.rows;
    this.pesquisaFloresta(page);
  }

  excluirFloresta(classeFloresta: any){
    this.florestaService.excluir(classeFloresta.cdClassefloresta)
     .then(() =>{
       if (this.grid.first === 0) {
         this.pesquisaFloresta();
       } else {
        this.grid.first = 0;
        this.pesquisaFloresta();
       }
       this.toasty.success('Floresta excluída com sucesso!')
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(classeFloresta: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      header: 'Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        this.excluirFloresta(classeFloresta);
      }
    });
  }


}
