import { CadTratamentoSilvicultural } from './../../core/model';
import { ActivatedRoute, Route } from '@angular/router';
import { SilviculturalService } from './../../situacao-silvicultural/silvicultural.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { TsatualtsanteriorService } from './../tsatualtsanterior.service';
import { MenuService } from './../../core/menu/menu.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tsatualtsanterior-pesquisa',
  templateUrl: './tsatualtsanterior-pesquisa.component.html',
  styleUrls: ['./tsatualtsanterior-pesquisa.component.css']
})
export class TsatualtsanteriorPesquisaComponent implements OnInit {
  cadTratamentoSilviculturalSalva = new CadTratamentoSilvicultural();
  listaTs = [];
  @ViewChild('tabela') grid;



  constructor(

    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private tsatualtsanteriorService: TsatualtsanteriorService,
    private confirmation: ConfirmationService,
    private menuService: MenuService,
    private situacaoService: SilviculturalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

  }


   // consultaTS//
   consultaTS(cdTratamentotual: number) {
    this.tsatualtsanteriorService.buscarPeloTs(cdTratamentotual)
      .then(resultado => {
       this.listaTs = resultado.listaTs;

     })
   .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPaginaTS(event: LazyLoadEvent) {
     const page = event.first / event.rows;
     this.consultaTS(page);
 }

 excluirTsAnterior(listaTs: any) {
  this.tsatualtsanteriorService.excluir(listaTs.cdTratamentoAnteriorPk)
   .then(() => {
     if (this.grid.first === 0) {
       this.consultaTS(this.carregarSilvicultural =  this.route.snapshot.params['codigo']);
           } else {
    this.grid.first = 0;
    this.consultaTS(this.carregarSilvicultural =  this.route.snapshot.params['codigo']);      }
     this.toasty.success('Situação Silvicultural excluída com sucesso!');
   })
   .catch(erro => this.errorHandler.handle(erro));

  }


 confirmarExclusaoTS(listaTs: any) {
  this.confirmation.confirm({
    message: 'Tem certeza que deseja excluir?',
    accept: () => {
      this.excluirTsAnterior(listaTs);
    }

  });
}

  carregarSilvicultural(codigo: number, ) {
    this.situacaoService.buscarPeloCogigoSilvicultural(codigo)
      .then(cadTratamentoSilvicultural => {
        this.cadTratamentoSilviculturalSalva = cadTratamentoSilvicultural;
      })
      .catch(erro => this.errorHandler.handle(erro));

       }


}
