import { SilviculturalService } from './../../situacao-silvicultural/silvicultural.service';
import { CadTsAtualTsAnterior, CadTratamentoSilvicultural, MenuEmpresa } from './../../core/model';
import { FormControl } from '@angular/forms';
import { TsatualtsanteriorService } from './../tsatualtsanterior.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MenuService } from './../../core/menu/menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tsatualtsanterior-cadastro',
  templateUrl: './tsatualtsanterior-cadastro.component.html',
  styleUrls: ['./tsatualtsanterior-cadastro.component.css']
})
export class TsatualtsanteriorCadastroComponent implements OnInit {
listaTs = [];

  cadTsAtualTsAnteriorSalva = new CadTsAtualTsAnterior();
  cadTratamentoSilviculturalSalva = new CadTratamentoSilvicultural();
  empresaSelecionada = new MenuEmpresa();

  constructor(
    private menuService: MenuService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private tsatualtsanteriorService: TsatualtsanteriorService,
    private situacaoService: SilviculturalService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title

  ) { }

  ngOnInit() {

    this.CarregarSilviculturaldropdown();
  }


  pesquisar2(cdEmpresa){
    return this.tsatualtsanteriorService.pesquisar2(cdEmpresa)
     .then(empresaSelecionada => this.listaTs = empresaSelecionada)
  }

  carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionada()
     .then(empresaSelecionada => {
       this.empresaSelecionada.cdEmpresa = empresaSelecionada
        this.pesquisar2(this.empresaSelecionada.cdEmpresa);
         this.cadTratamentoSilviculturalSalva.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa

     })
     .catch(erro => this.errorHandler.handle(erro));

  }

  consultaTS(cdTratamentoAnterior: number) {
    this.tsatualtsanteriorService.buscarPeloTs(cdTratamentoAnterior)
      .then(resultado => {
       this.listaTs = resultado.listaTs;

     })
   .catch(erro => this.errorHandler.handle(erro));
  }


  adicionarTsAtual(form: FormControl) {
    this.tsatualtsanteriorService.adicionar(this.cadTsAtualTsAnteriorSalva)
      .then(() => {
        this.cadTsAtualTsAnteriorSalva = new CadTsAtualTsAnterior();
        this.toasty.success('Cadastrado realizado com sucesso!');
        ///Pega o valor do cdTratamento como busca na consultaTS
        this.consultaTS(this.carregarSilvicultural =  this.route.snapshot.params['codigo']);
      })

      .catch(erro => this.errorHandler.handle(erro));

  }


  carregarSilvicultural(codigo: number, ) {
    this.situacaoService.buscarPeloCogigoSilvicultural(codigo)
      .then(cadTratamentoSilvicultural => {
        this.cadTratamentoSilviculturalSalva = cadTratamentoSilvicultural;
      })
      .catch(erro => this.errorHandler.handle(erro));

       }


       carregarTsanterior(cod: number) {
        this.tsatualtsanteriorService.buscarPeloTsAtualiza(cod)
         .then(cadTsAtualTsAnterior => {
            this.cadTsAtualTsAnteriorSalva = cadTsAtualTsAnterior;
         })
         .catch(erro => this.errorHandler.handle(erro));
      }



      CarregarSilviculturaldropdown() {
        return this.situacaoService.listarSilvicultural()
          .then(listaTsSalva => {
            this.listaTs = listaTsSalva.map(c => ({ label: c.cdTratamento + ' - ' + c.nmTratamento, value: c.cdTratamento }));
          })
          .catch(erro => this.errorHandler.handle(erro));
      }

  }


