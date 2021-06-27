import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { subParcelaFiltro, SubparcelaService } from './../subparcela.service';
import { ConfirmationService} from 'primeng/components/common/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MenuService } from 'src/app/core/menu/menu.service';
import { CadSubParcela, empresaSelecionada } from 'src/app/core/model';

@Component({
  selector: 'app-subparcela-pesquisa',
  templateUrl: './subparcela-pesquisa.component.html',
  styleUrls: ['./subparcela-pesquisa.component.css']
})
export class SubparcelaPesquisaComponent implements OnInit {

  filtro = new subParcelaFiltro;
  cadsubparcela = [];
  totalRegistrosSubParcela = 0;
  subParcelaSalva = new CadSubParcela();
  cdEmp: any;
  @ViewChild('tabela') grid;

  constructor(
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private menuService: MenuService,
    private subparcelaService: SubparcelaService
  ) { }

  ngOnInit() {
  }

  // carregarEmpresaSelecionada() {
  //    return this.menuService.carregarEmpresaSelecionada()
  //     .then(empresaSelecionada => {
  //       this.pesquisarSubParcela;
  //     })
  //     .catch(erro => this.errorHandler.handle(erro));
  //   }

  pesquisarSubParcela(page = 0) {
     this.filtro.page = page;
     this.filtro.cdEmpresa = this.cdEmp;
     this.subparcelaService.pesquisar(this.filtro)
      .then(resultado => {
         this.totalRegistrosSubParcela =  resultado.total;
          this.cadsubparcela = resultado.cadsubparcela;

      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.pesquisarSubParcela(page);
  }

}
