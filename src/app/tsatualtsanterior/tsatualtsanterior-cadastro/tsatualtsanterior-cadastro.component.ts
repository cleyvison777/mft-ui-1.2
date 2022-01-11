import { EmpresaService } from 'src/app/empresa/empresa.service';
import { TsatualtsanteriorService } from './../tsatualtsanterior.service';
import { FormControl } from '@angular/forms';
import { MenuEmpresa, CadTsAtualTsAnterior, CadTratamentoSilvicultural } from './../../core/model';
import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { SilviculturalService } from './../../situacao-silvicultural/silvicultural.service';
import { MenuService } from 'src/app/core/menu/menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tsatualtsanterior-cadastro',
  templateUrl: './tsatualtsanterior-cadastro.component.html',
  styleUrls: ['./tsatualtsanterior-cadastro.component.css']
})
export class TsatualtsanteriorCadastroComponent implements OnInit {
  empresaSelecionada = new MenuEmpresa();
  cadTratamentoSilviculturalSalva = new CadTratamentoSilvicultural();
  cadTsAtualTsAnteriorSalva = new CadTsAtualTsAnterior();
  listaTs = [];
  empresas =[];
  listaTsSalva = [];

  constructor(
    private menuService: MenuService,
    private cadEmpresaService: EmpresaService,
    private situacaoService: SilviculturalService,
    private tsService: TsatualtsanteriorService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    this.carregarEmpresas();
    this.CarregarSilviculturaldropdown();
  }


  get editandoTs() {
    return Boolean(this.cadTsAtualTsAnteriorSalva.cdTratamentoAnteriorPk);
 }

  consultaTS(cdTratamentoAnterior: number) {
    this.tsService.buscarPeloTs(cdTratamentoAnterior)
      .then(resultado => {
       this.listaTs = resultado.listaTs;

     })
   .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarTsAtual(form: FormControl) {
    this.tsService.adicionar(this.cadTsAtualTsAnteriorSalva)
      .then(() => {
        this.cadTsAtualTsAnteriorSalva = new CadTsAtualTsAnterior();
        this.toasty.success('Cadastrado realizado com sucesso!');
        ///Pega o valor do cdTratamento como busca na consultaTS
        this.consultaTS(this.carregarSilvicultural =  this.route.snapshot.params['codigo']);
      })

      .catch(erro => this.errorHandler.handle(erro));

  }


  carregarTsanterior(cod: number) {
    this.tsService.buscarPeloTsAtualiza(cod)
     .then(cadTsAtualTsAnterior => {
        this.cadTsAtualTsAnteriorSalva = cadTsAtualTsAnterior;
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  carregarEmpresas() {
    return this.cadEmpresaService.listarTodas()
      .then(empresas => {
        this.empresas = empresas.map(c => ({ label: c.cdEmpresa + ' - ' + c.nmEmpresa, value: c.cdEmpresa }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  CarregarSilviculturaldropdown() {
    return this.situacaoService.listarSilvicultural()
      .then(listaTsSalva => {
        this.listaTsSalva = listaTsSalva.map(c => ({ label: c.cdTratamento + ' - ' + c.nmTratamento, value: c.cdTratamento }));
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


}
