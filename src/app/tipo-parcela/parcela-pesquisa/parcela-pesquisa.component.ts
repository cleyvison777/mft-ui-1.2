import { MenuService } from 'src/app/core/menu/menu.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { CadTipoParcela } from './../../core/model';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { TipoParcelaService, TipoParcelaFiltro } from './../tipo-parcela.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-parcela-pesquisa',
  templateUrl: './parcela-pesquisa.component.html',
  styleUrls: ['./parcela-pesquisa.component.css']
})
export class ParcelaPesquisaComponent implements OnInit {

  filtro = new TipoParcelaFiltro();
  totalRegistrosTipoParcela = 0;
  listaTipoparcela = [];
  cdEmp: any;
  cadTipoParcelaSalva = new CadTipoParcela();
  @ViewChild('tabela') grid;
  constructor(
    private tipoParcelaService: TipoParcelaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private menuService: MenuService
  ) { }

  ngOnInit() {

  }

  get editando(){
    return Boolean(this.cadTipoParcelaSalva.cdTipoParcela);
  }

  carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.cdEmp = empresaSelecionada;
        this.consultarTipoParcela();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  consultarTipoParcela(page = 0) {
    this.filtro.page = page;
    this.filtro.cdEmpresa = this.cdEmp;
    this.tipoParcelaService.pesquisaTipoParcela(this.filtro)
     .then(resultado => {
       this.totalRegistrosTipoParcela = resultado.total;
       this.listaTipoparcela = resultado.listaTipoparcela;
     })
     .catch(erro => this.errorHandler.handle(erro));

  }
   //paginação
  aoMudarPaginaTipoParcela(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.carregarEmpresaSelecionada();

     }

     excluindoTipoParcela(listaTipoparcela: any){
      this.tipoParcelaService.excluirTipoParcela(listaTipoparcela.cdTipoParcela)
      .then(()=>{
        if(this.grid.first === 0){
          this.consultarTipoParcela();
        } else{
          this.grid.first = 0;
          this.consultarTipoParcela();
        }
        this.toasty.success('Familia excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
    }
    confirmarExclusaoTipoParcela(listaTipoparcela: any){
      this.confirmation.confirm({
        message: 'Tem certeza que deseja excluir?',
        accept: () => {
          this.excluindoTipoParcela(listaTipoparcela);
        }
      });
    }

}
