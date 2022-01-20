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
cdEmp: any;

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

    this.carregarEmpresaSelecionada(); //se bug quando seleciono a empresa // ao mandar carregar empresa da burg
    this.CarregarSilviculturaldropdown();

  }


  pesquisar2(cdEmpresa){
     this.tsatualtsanteriorService.pesquisar2(cdEmpresa)
     .then(empresaSelecionada => this.listaTs = empresaSelecionada)
  }

  carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionada()
     .then(empresaSelecionada => {
       this.empresaSelecionada.cdEmpresa = empresaSelecionada;
       this.cdEmp = this.empresaSelecionada.cdEmpresa;
       // this.pesquisar2(this.empresaSelecionada.cdEmpresa);
         this.cadTratamentoSilviculturalSalva.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa

     })
     .catch(erro => this.errorHandler.handle(erro));

  }

  consultaTS(cdTratamentotual: number) {
    this.tsatualtsanteriorService.buscarPeloTs(cdTratamentotual)
      .then(resultado => {
       this.listaTs = resultado.listaTs;

     })
   .catch(erro => this.errorHandler.handle(erro));
  }


  adicionarTsAtual(form: FormControl) {
    this.cadTsAtualTsAnteriorSalva.cdEmpresa.cdEmpresa = this.cdEmp;
    this.tsatualtsanteriorService.adicionar(this.cadTsAtualTsAnteriorSalva)
      .then(() => {
        this.cadTsAtualTsAnteriorSalva = new CadTsAtualTsAnterior();
        this.toasty.success('Cadastrado realizado com sucesso!');
        this.refresh();
        ///Pega o valor do cdTratamento como busca na consultaTS

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
          .then(listaTs => {
            this.listaTs = listaTs.map(c => ({ label: c.cdTratamento + ' - ' + c.nmTratamento, value: c.cdTratamento }));
          })
          .catch(erro => this.errorHandler.handle(erro));
      }


  refresh(): void {
    window.location.reload();
 }

  }


