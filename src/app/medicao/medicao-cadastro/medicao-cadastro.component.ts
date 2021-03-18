import { MenuItem } from 'primeng/api';
import { AreaService } from './../../area/area.service';
import { FormControl } from '@angular/forms';
import { MenuEmpresa, CadMedicao } from './../../core/model';
import { MedicaoService } from './../medicao.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MenuService } from 'src/app/core/menu/menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicao-cadastro',
  templateUrl: './medicao-cadastro.component.html',
  styleUrls: ['./medicao-cadastro.component.css']
})
export class MedicaoCadastroComponent implements OnInit {
  cdEmp: any;
  cadMedicao = [];
  area = [];
  empresaSelecionada = new MenuEmpresa();
  cadMedicaoSalva = new CadMedicao();
  items: MenuItem[];
  activeItem: MenuItem;
  constructor(
    private menuService: MenuService,
    private areaService: AreaService,
    private errorHandler: ErrorHandlerService,
    private medicaoService:  MedicaoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.carregarArea();
    this.carregarEmpresaSelecionada();

    this.items = [
      {label: 'Medição', icon: 'fa-bar-chart', routerLink: '/medicao/cadastro'},
      {label: 'Classe tamanho', icon: 'fa-calendar', routerLink: '/classe-tamanho/cadastro'},
  ];

    const codigoMedicao =  this.route.snapshot.params['codigo'];
    if(codigoMedicao) {
      this.carregarMedicao(codigoMedicao);
    }

    this.title.setTitle('Medição')


  }



  get editando() {
    return  Boolean(this.cadMedicaoSalva.cdMedicao);
  }

  adicionarMedicao(form: FormControl){
    this.medicaoService.adicionar(this.cadMedicaoSalva)
    .then(() =>{
      this.toasty.success("Uso medição cadastrada com sucesso!");
      form.reset();
      this.refresh()
    })
    .catch(erro => this.errorHandler.handle(erro));

  }


  pesquisar2(cdEmpresa) {
    this.medicaoService.pesquisar2(cdEmpresa)
      .then(empresaSelecionada =>  this.cadMedicao  = empresaSelecionada);
  }

  carregarEmpresaSelecionada(){
    return this.menuService.carregarEmpresaSelecionada()
     .then(empresaSelecionada => {
       this.empresaSelecionada.cdEmpresa = empresaSelecionada;
       this.pesquisar2(this.empresaSelecionada.cdEmpresa);
       this.cadMedicaoSalva.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa

     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  carregarArea() {
    return this.areaService.listarTodasArea()
    .then( area => {
      this.area = area.map(e => ({label: e.cdarea + " - " + e.nmArea, value: e.cdarea}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  atualizandoMedicao(form: FormControl) {
    this.medicaoService.atualizar(this.cadMedicaoSalva)
     .then(cadMedicao => {
       this.cadMedicaoSalva = cadMedicao;
       this.toasty.success('Atualização realizada com sucesso!');
       this.router.navigate(['/medicao/cadastro']);

     })
     .catch(erro => this.errorHandler.handle(erro));
  }

   //confirmação para alterar


confirmarAlterar(cadMedicao: any) {
  this.confirmation.confirm({
      message: 'Tem certeza que deseja alterar?',
      accept: () => {
        this.atualizandoMedicao(cadMedicao);
      }
    });
}

carregarMedicao(codigo: number) {
  this.medicaoService.buscarPeloCodigoMedicao(codigo)
   .then(cadMedicao => {
    this.cadMedicaoSalva = cadMedicao
    })
    .catch(erro => this.errorHandler.handle(erro));
   }

   salvar(form: FormControl) {
     if(this.editando) {
       this.confirmarAlterar(form);
     } else {
       this.adicionarMedicao(form);
     }
   }






  refresh(): void {
    window.location.reload();
  }


}
