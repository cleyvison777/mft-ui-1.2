import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { AreaService, CadAreaFiltro } from './../area.service';


@Component({
  selector: 'app-pesquisa-area',
  templateUrl: './pesquisa-area.component.html',
  styleUrls: ['./pesquisa-area.component.css']
})
export class PesquisaAreaComponent implements OnInit {

filtro = new CadAreaFiltro();
totalRegistros = 0;
empresas = [];
area = [];
@ViewChild('tabela') grid;

  constructor (
    private areaService: AreaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler :ErrorHandlerService

              ) { }

  ngOnInit() {

  }

  pesquisarArea(page = 0){
    this.filtro.page = page;
     this.areaService.pequisar(this.filtro)
      .then(resultado =>{
        this.totalRegistros = resultado.total;
        this.area = resultado.cadarea;
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  aoMudarPagina(event: LazyLoadEvent){
    const page = event.first / event.rows;
    this.pesquisarArea(page);
  }

  excluirAmf(area: any){
    this.areaService.excluir(area.cdarea)
     .then(() => {
      if (this.grid.first === 0) {
        this.pesquisarArea();
      } else {
        this.grid.first = 0;
        this.pesquisarArea();
       }
      this.toasty.success('Area excluída com sucesso!')
     })
     .catch(erro => this.errorHandler.handle(erro));

  }

  confirmarExclusao(area: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      header: 'Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        this.excluirAmf(area);
      }
    });
  }

}
