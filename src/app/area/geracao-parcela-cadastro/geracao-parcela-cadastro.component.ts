import { EmpresaService } from './../../empresa/empresa.service';
import { TipoParcelaService } from './../../tipo-parcela/tipo-parcela.service';
import { MenuEmpresa, GeraParcelESubParcela } from '../../core/model';
import { FormControl } from '@angular/forms';
import { GeracaoParcelaService } from '../geracao-parcela.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { Router, ActivatedRoute } from '@angular/router';
import { AreaService } from '../area.service';
import { MenuService } from '../../core/menu/menu.service';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geracao-parcela-cadastro',
  templateUrl: './geracao-parcela-cadastro.component.html',
  styleUrls: ['./geracao-parcela-cadastro.component.css']
})
export class GeracaoParcelaCadastroComponent implements OnInit {
  empresas =[];
  area = [];
  geracao = []
  listaTipoparcela = [];
  cdEmp: any;
  empresaSelecionada = new MenuEmpresa();
  geraParcelESubParcelaSalva = new GeraParcelESubParcela();

  displayBasic: boolean; //chamar o dialog
  constructor(
    private errorHandler :ErrorHandlerService,
    private toasty: ToastyService,
    private menuService: MenuService,
    private Router: ActivatedRoute,
    private confirmation: ConfirmationService,
    private router: Router,
    private areaService: AreaService,
    private geracaoParcelaService: GeracaoParcelaService,
    private tipoParcelaService: TipoParcelaService,
    private empresaService:  EmpresaService
  ) { }

  ngOnInit() {
     this.carregarArea();
     this.carregarTipoParcela();
     this.carregarEmpresas();
  }

     ////chamar o dialog
  showBasicDialog() {
   this.displayBasic = true
  }

  adicionar(form: FormControl){
    this.geracaoParcelaService.adicionar(this.geraParcelESubParcelaSalva)
      .then(() => {
        this.toasty.success('Parcela gerada com sucesso!');
        form.reset()
        this.refresh();
        this.toasty.success('Cadastrado realizado com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));

  }
  carregarTipoParcela() {
     return this.tipoParcelaService.listarTodasParcelas()
      .then( listaTipoparcela =>{
        this.listaTipoparcela = listaTipoparcela.map( e => ({label: e.cdTipoParcela + " - "+ e.nmTipoParcela, value: e.cdTipoParcela}))
      })
  }

  carregarEmpresas() {
    return this.empresaService.listarTodas()
      .then(empresas => {
        this.empresas = empresas.map(c => ({ label: c.cdEmpresa + " - " + c.nmEmpresa, value: c.cdEmpresa }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarArea() {
    return this.areaService.listarTodasArea()
     .then( area =>{
       this.area = area.map(e => ({label: e.cdarea + " - " + e.nmArea, value: e.cdarea}));
     })
     .catch(erro => this.errorHandler.handle(erro));
  }




  refresh(): void {
    window.location.reload();
    }

    pesquisar2(cdEmpresa) {
      this.geracaoParcelaService.pesquisar2(cdEmpresa)
        .then(empresaSelecionada =>  this.geracao  = empresaSelecionada);
    }

    carregarEmpresaSelecionada(){
      return this.menuService.carregarEmpresaSelecionada()
       .then(empresaSelecionada => {
         this.empresaSelecionada.cdEmpresa = empresaSelecionada;
         this.pesquisar2(this.empresaSelecionada.cdEmpresa);
         this.geraParcelESubParcelaSalva.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa

       })
       .catch(erro => this.errorHandler.handle(erro));
    }

}
