import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { MenuService } from './../../core/menu/menu.service';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { FormaCopaService, FormaCopaFiltro } from './../forma-copa.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-forma-pesquisa',
  templateUrl: './forma-pesquisa.component.html',
  styleUrls: ['./forma-pesquisa.component.css']
})
export class FormaPesquisaComponent implements OnInit {
totalRegistroFormaCopa = 0;
copa = [];
cdEmp: any;
filtro = new FormaCopaFiltro();
@ViewChild('tabela') grid;

  constructor(

    private formaCopaService: FormaCopaService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private menuService: MenuService,

  ) { }

  ngOnInit() {



  }

   consultar(page = 0){
     this.filtro.page = page;
     this.filtro.cdEmpresa = this.cdEmp;
     this.formaCopaService.consultar(this.filtro)
      .then(resultado => {
        this.totalRegistroFormaCopa = resultado.total;
        this.copa = resultado.copa;
      })
      .catch(erro => this.errorHandler.handle(erro));
   }

   aoMudarPaginaCopa(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.carregarEmpresaSelecionada();
  }


   carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.cdEmp = empresaSelecionada;
        this.consultar();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }



  excluir(copa: any){

    this.formaCopaService.excluir(copa.cdFormaCopa)
    .then(() => {
     if (this.grid.first === 0) {
       this.consultar();
     } else {
       this.grid.first = 0;
       this.consultar();
     }
     this.toasty.success('Iluminação excluída com sucesso!');
   })
   .catch(erro => this.errorHandler.handle(erro));
 }

 confirmarExclusao(cdFormaCopa: any){
     this.confirmation.confirm({
       message: 'Tem certeza que deseja excluir ?',
       accept: () => {
         this.excluir(cdFormaCopa);
       }
     })

 }

}
