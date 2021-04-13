import { GeracaoParSubService, gerarParcelaFiltro } from './../geracao-par-sub.service';
import { FormControl } from '@angular/forms';
import { TipoParcelaService } from './../../tipo-parcela/tipo-parcela.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { MenuService } from './../../core/menu/menu.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { Router, ActivatedRoute } from '@angular/router';
import { AreaService } from './../../area/area.service';
import { GeraParcelESubParcela, MenuEmpresa } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/empresa/empresa.service';

@Component({
  selector: 'app-cadastro-geracao-parcela',
  templateUrl: './cadastro-geracao-parcela.component.html',
  styleUrls: ['./cadastro-geracao-parcela.component.css']
})
export class CadastroGeracaoParcelaComponent implements OnInit {
  empresas =[];
  area = [];
  geracao = []
  listaTipoparcela = [];
  cdEmp: any;
  empresaSelecionada = new MenuEmpresa();
  geraParcelESubParcelaSalva = new GeraParcelESubParcela();
  displayBasic: boolean; //chamar o dialog
  filtro = new gerarParcelaFiltro();

  constructor(
    private errorHandler :ErrorHandlerService,
    private toasty: ToastyService,
    private menuService: MenuService,
    private Router: ActivatedRoute,
    private confirmation: ConfirmationService,
    private router: Router,
    private areaService: AreaService,
    private geracaoParcelaService: GeracaoParSubService,
    private tipoParcelaService: TipoParcelaService,
    private empresaService:  EmpresaService
  ) { }

  ngOnInit() {
    this.carregarArea();
    this.carregarTipoParcela();
    this.carregarEmpresaSelecionada();
    this.carregarEmpresas();
   }

   adicionarParcela(form: FormControl){
     this.geracaoParcelaService.adicionar(this.geraParcelESubParcelaSalva)
      .then(() => {
        this.toasty.success("Uso Especie cadastrada com sucesso!");
        form.reset();
        this.refresh()
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





    carregarEmpresaSelecionada(){
      return this.menuService.carregarEmpresaSelecionada()
       .then(empresaSelecionada => {
         this.empresaSelecionada.cdEmpresa = empresaSelecionada;
         this.filtro.cdempresa = this.empresaSelecionada.cdEmpresa
         this.geraParcelESubParcelaSalva.cdEmpresa = this.empresaSelecionada.cdEmpresa

       })
       .catch(erro => this.errorHandler.handle(erro));
    }

}
