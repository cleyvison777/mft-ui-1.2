import { TsatualtsanteriorService } from './../../tsatualtsanterior/tsatualtsanterior.service';
import { CadTsAtualTsAnterior } from './../../core/model';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { MenuService } from './../../core/menu/menu.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { SilviculturalFiltro, SilviculturalService } from './../silvicultural.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-silvicultural-pesquisa',
  templateUrl: './silvicultural-pesquisa.component.html',
  styleUrls: ['./silvicultural-pesquisa.component.css']
})
export class SilviculturalPesquisaComponent implements OnInit {
  totalElementosSilvicultural = 0;
  listaSilvicultural = [];
  listaTs = [];
  cadTsAtualTsAnteriorSalva = new CadTsAtualTsAnterior();

  filtro = new SilviculturalFiltro();
  cdEmp: any;
  @ViewChild('tabela') grid;

  constructor(
    private situacaoService: SilviculturalService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private menuService: MenuService,
    private tsService: TsatualtsanteriorService,
  ) { }

  ngOnInit() {
    this.carregarTS();

  }

  //consulta por empresa
  carregarEmpresaSelecionada() {
     return this.menuService.carregarEmpresaSelecionada()
       .then(empresaSelecionada => {
         this.cdEmp = empresaSelecionada;
          this.consultaSilvicultural();
       })
       .catch(erro => this.errorHandler.handle(erro));
  };

   // consultaSilvicultural

  consultaSilvicultural(page = 0) {
    this.filtro.page = page
    this.filtro.cdEmpresa = this.cdEmp;
    this.situacaoService.consultar(this.filtro)
     .then(resultado =>{
       this.totalElementosSilvicultural = resultado.total;
       this.listaSilvicultural = resultado.listaSilvicultural;
     })
     .catch(erro => this.errorHandler.handle(erro));

  }

  consultaTS(cdTratamento: number) {
    this.tsService.buscarPeloTs(cdTratamento)
      .then(resultado => {
       this.listaTs = resultado.listaTs;

     })
   .catch(erro => this.errorHandler.handle(erro));
  }
  // paginaçãoaoMudarPaginaSilvicultal

  aoMudarPaginaSilvicultal(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.carregarEmpresaSelecionada();
  }

  excluirSilvicultural(listaSilvicultural: any) {
    this.situacaoService.excluir(listaSilvicultural.cdTratamento)
     .then(() =>{
       if (this.grid.first === 0) {
         this.consultaSilvicultural();
       }
       else {
        this.grid.first = 0;
        this.consultaSilvicultural();
       }
       this.toasty.success('Situação Silvicultural excluída com sucesso!');

     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(listaSilvicultural: any) {
     this.confirmation.confirm({
       message: 'Tem certeza que deseja excluir?',
       accept: () => {
        this.excluirSilvicultural(listaSilvicultural);
       }
     });
  }

   carregarTS(){
    return this.tsService.listarTodasTS()
     .then(listaTs => {
       this.listaTs = listaTs.map(c => ({label: c.cdTratamentoAnterior, value: c.cdTratamentoAnterior}))
     })
     .catch(erro => this.errorHandler.handle(erro));
  }


}
