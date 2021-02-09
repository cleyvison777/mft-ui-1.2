import { environment } from './../../../environments/environment.prod';
import { FormControl } from '@angular/forms';
import { FlorestaService } from './../floresta.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { EmpresaService } from './../../empresa/empresa.service';
import { MenuService } from './../../core/menu/menu.service';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ClasseFloresta, MenuEmpresa, empresaSelecionada } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-floresta',
  templateUrl: './cadastro-floresta.component.html',
  styleUrls: ['./cadastro-floresta.component.css']
})
export class CadastroFlorestaComponent implements OnInit {
  empresas = [];
  cdEmp: any;
  floresta = [];
  enderecoImagem: Set<File>;
  classeflorestaSalva = new ClasseFloresta();
  empresaSelecionada = new MenuEmpresa();


  constructor(
    private errorHandler :ErrorHandlerService,
    private toasty: ToastyService,
    private menuService: MenuService,
    private empresaService: EmpresaService,
    private title: Title,
    private route: ActivatedRoute,
    private confirmation: ConfirmationService,
    private router: Router,
    private florestaService: FlorestaService,
  ) { }

  ngOnInit() {
    this.carregarEmpresas();
    this.carregarEmpresaSelecionada();

    this.title.setTitle('Classe Floresta')
  }

  get editando(){
    return Boolean(this.classeflorestaSalva.cdClassefloresta);
  }


  adicionarFloresta(form: FormControl){
    this.florestaService.adicionar(this.classeflorestaSalva)

     .then(() => {
      this.onBasicUpload(this.classeflorestaSalva.enderecoImagem)
      this.toasty.success('Cadastrado realizado com sucesso!');
      //form.reset();
     // this.refresh();
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  carregarEmpresas() {
    return this.empresaService.listarTodas()
      .then(empresas => {
        this.empresas = empresas.map(c => ({ label: c.cdEmpresa + " - " + c.nmEmpresa, value: c.cdEmpresa }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  onBasicUpload(imFigura: FormControl){
    this.florestaService.Upload(this.enderecoImagem)
      console.log();
  }




   atualizarTitoloEdicao(){
     this.title.setTitle(`Edição Floresta: ${this.classeflorestaSalva.nmClassefloresta}`)
   }


  pesquisar2(cdEmpresa) {
    this.florestaService.pesquisar2(cdEmpresa)
      .then(empresaSelecionada =>  this.floresta  = empresaSelecionada);
  }

  carregarEmpresaSelecionada(){
    return this.menuService.carregarEmpresaSelecionada()
     .then(empresaSelecionada => {
       this.empresaSelecionada.cdEmpresa = empresaSelecionada;
       this.pesquisar2(this.empresaSelecionada.cdEmpresa);
       this.classeflorestaSalva.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa

     })
     .catch(erro => this.errorHandler.handle(erro));
  }



  refresh(): void {
    window.location.reload();
    }



}
