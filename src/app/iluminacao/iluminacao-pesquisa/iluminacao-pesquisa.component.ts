import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { InvContIluminacao } from './../../core/model';
import { MenuService } from 'src/app/core/menu/menu.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { IluminacaoService, IluminacaoFiltro } from './../iluminacao.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-iluminacao-pesquisa',
  templateUrl: './iluminacao-pesquisa.component.html',
  styleUrls: ['./iluminacao-pesquisa.component.css']
})
export class IluminacaoPesquisaComponent implements OnInit {
  totalRegistrosIluminacao = 0;

  iluminacao = [];
  cdEmp: any;
  filtro = new IluminacaoFiltro();
  @ViewChild('tabela') grid;

  constructor(
    private iluminacaoService: IluminacaoService,
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
     this.iluminacaoService.consultar(this.filtro)
      .then (resultado => {
        this.totalRegistrosIluminacao = resultado.total;
         this.iluminacao = resultado.iluminacao;
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  aoMudarPaginaIluminacao(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.carregarEmpresaSelecionada();
  }

  excluir(iluminacao: any){

     this.iluminacaoService.excluir(iluminacao.cdIluminacao)
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

  confirmarExclusao(iluminacao: any){
      this.confirmation.confirm({
        message: 'Tem certeza que deseja excluir ?',
        accept: () => {
          this.excluir(iluminacao);
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
