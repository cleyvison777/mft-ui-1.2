import { MenuService } from './../../core/menu/menu.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { InvContDano, MenuEmpresa, Cadempresa } from './../../core/model';
import { DanoFiltro, DanoService } from './../dano.service';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dano-pesquisa',
  templateUrl: './dano-pesquisa.component.html',
  styleUrls: ['./dano-pesquisa.component.css']
})
export class DanoPesquisaComponent implements OnInit {

  invContDano = [];
  filtro = new DanoFiltro();
  @ViewChild('tabela') grid;
  totalRegistrosDano = 0;
  invContDanoSalva = new InvContDano();
  empresaSelecionada = new MenuEmpresa();
  cdEmp: any;

  constructor(
    private danoService: DanoService,
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
    this.danoService.consulta(this.filtro)
     .then(resultado => {
       this.totalRegistrosDano = resultado.total;
      this.invContDano = resultado.invContDano
     })
     .catch(erro => this.errorHandler.handle(erro));

  }

  aoMudarPaginaDano(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.carregarEmpresaSelecionada();
  }


  excluir(invContDano: any) {
    this.danoService.excluir(invContDano.cdDano)
     .then(() => {
       if (this.grid.first === 0) {
         this.consultar();
       } else {
         this.grid.first = 0;
         this.consultar();
       }
       this.toasty.success('Dano excluída com sucesso!');
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

      confirmarExclusao(invContDano: any) {
        this.confirmation.confirm({
          message: 'Tem certeza que deseja excluir?',
          accept: () => {
            this.excluir(invContDano);
          }
        });
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
