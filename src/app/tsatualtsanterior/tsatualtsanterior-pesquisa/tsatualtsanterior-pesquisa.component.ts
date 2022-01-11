import { CadTratamentoSilvicultural } from './../../core/model';
import { Router, ActivatedRoute } from '@angular/router';
import { SilviculturalService } from './../../situacao-silvicultural/silvicultural.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ConfirmationService } from 'primeng/components/common/api';
import { MenuService } from 'src/app/core/menu/menu.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { TsatualtsanteriorService } from './../tsatualtsanterior.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tsatualtsanterior-pesquisa',
  templateUrl: './tsatualtsanterior-pesquisa.component.html',
  styleUrls: ['./tsatualtsanterior-pesquisa.component.css']
})
export class TsatualtsanteriorPesquisaComponent implements OnInit {
  listaTs = [];
  listaSilvicultural = [];
  listaTsSalva = [];
  cdEmp: any;
  @ViewChild('tabela') grid;

  cadTratamentoSilviculturalSalva = new CadTratamentoSilvicultural();

  constructor(
    private tsatualtsanteriorService: TsatualtsanteriorService,
    private situacaoService: SilviculturalService,

    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private menuService: MenuService,
    private route: ActivatedRoute,

    private router: Router


  ) { }

  ngOnInit() {
  }



   // consultaTS//
   consultaTS(cdTratamentoAnterior: number) {
    this.tsatualtsanteriorService.buscarPeloTs(cdTratamentoAnterior)
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
