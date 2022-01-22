import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ProdricaoService, PodricaoFiltro } from './../prodricao.service';
import { InvContPodridao } from './../../core/model';
import { MenuService } from './../../core/menu/menu.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-podridao-pesquisa',
  templateUrl: './podridao-pesquisa.component.html',
  styleUrls: ['./podridao-pesquisa.component.css']
})
export class PodridaoPesquisaComponent implements OnInit {
  totalRegistrosPodricao = 0;

  podridao = [];
  cdEmp: any;
  filtro = new PodricaoFiltro();
  @ViewChild('tabela') grid;

  constructor(
    private podricaoService: ProdricaoService,
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
    this.podricaoService.consultar(this.filtro)
     .then(resultado =>{
       this.totalRegistrosPodricao = resultado.total;
        this.podridao = resultado.podridao
     })
     .catch(erro => this.errorHandler.handle(erro));
   }

   aoMudarPaginaPodridao(event: LazyLoadEvent) {
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

    excluir (podricao: any) {
      this.podricaoService.excluir(podricao.cdPodridao)
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
  confirmarExclusao(podricao: any) {
    this.confirmation.confirm({
      message:'Tem certeza que deseja excluir ?',
      accept: () => {
        this.excluir(podricao)
      }
    })
  }
}
