import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { MenuService } from 'src/app/core/menu/menu.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { CipoFiltro, CipoService } from './../cipo.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cipo-pesquisa',
  templateUrl: './cipo-pesquisa.component.html',
  styleUrls: ['./cipo-pesquisa.component.css']
})
export class CipoPesquisaComponent implements OnInit {
  totalRegistrosCipo = 0;

cipo = [];
cdEmp: any;
filtro = new CipoFiltro();
@ViewChild('tabela') grid;



  constructor(
    private cipoService: CipoService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private menuService: MenuService,
  ) { }

  ngOnInit() {
  }

  consultar(page = 0) {
    this.filtro.page = page;
    this.filtro.cdEmpresa = this.cdEmp;
    this.cipoService.consultar(this.filtro)
     .then( resultado => {
       this.totalRegistrosCipo = resultado.total;
        this.cipo = resultado.cipo
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPaginaICipo(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.carregarEmpresaSelecionada();
  }

 excluir(cipo: any) {
   this.cipoService.excluir(cipo.cdCipo)
   .then(() => {
    if (this.grid.first === 0) {
      this.consultar();
    } else {
      this.grid.first = 0;
      this.consultar();
    }
    this.toasty.success('Cípo excluída com sucesso!');
  })
  .catch(erro => this.errorHandler.handle(erro));
 }

 confirmarExclusao(cipo: any) {
     this.confirmation.confirm({
       message: 'Tem certeza que deseja excluir ?',
       accept: () => {
         this.excluir(cipo)
       }
     })
 }


  carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionada()
     .then(empresaSelecionada => {
       this.cdEmp = empresaSelecionada;
       this.consultar();
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

}
