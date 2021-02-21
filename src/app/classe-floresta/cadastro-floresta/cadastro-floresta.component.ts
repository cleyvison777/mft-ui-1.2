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
  anexo: File = null;
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
    this.carregarEmpresaSelecionada();
    this.title.setTitle('Classe Floresta');

    const codigoFloresta = this.route.snapshot.params['codigo'];

     if(codigoFloresta){
       this.carregarFloresta(codigoFloresta);
     }

  }

  get urlUploadAnexo(){
    return this.florestaService.urlUploadAnexo(this.classeflorestaSalva);
  }

  upload(form: FormData){
    //pick from one of the 4 styles of file uploads below
   // this.florestaService.basicUpload(this.classeflorestaSalva);
  }

  // antesUpload(event){
  //    this.florestaService.urlUploadAnexo(event);
  // }




  // get urlUploadAnexo(){
  //   return this.florestaService.urlUploadAnexo(this.classeflorestaSalva)
  // }


  get editando(){
    return Boolean(this.classeflorestaSalva.cdClassefloresta);
  }




  adicionarFloresta(form: FormControl){
    this.florestaService.adicionar(this.classeflorestaSalva)

     .then(() => {
      this.toasty.success('Cadastrado realizado com sucesso!');
      // form.reset();
      // this.refresh();
     })
     .catch(erro => this.errorHandler.handle(erro));
  }




  // onBasicUpload(imFigura: FormControl){
  //   this.florestaService.Upload(this.classeflorestaSalva.enderecoImagem)
  //     console.log();
  // }

  atualizarFloresta(form: FormControl){
    this.florestaService.atualizar(this.classeflorestaSalva)
     .then(classefloresta => {
        this.classeflorestaSalva = classefloresta;
        this.toasty.success('Classe floresta atualizada com sucesso!');
        this.router.navigate(['/floresta/cadastro']);
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarAlterarFloresta(classeFloresta: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja alterar?',
      accept: () => {
        this.atualizarFloresta(classeFloresta);
      }
    })
  }

  carregarFloresta(cdClassefloresta: number){
      this.florestaService.buscarPeloCodigo(cdClassefloresta)
       .then(floresta => {
         this.classeflorestaSalva = floresta;
         this.atualizarTitoloEdicao();
       })
       .catch(erro => this.errorHandler.handle(erro));
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

  salvar(form: FormControl){
   if(this.editando) {
    this.confirmarAlterarFloresta(form)
   }  else {
    this.adicionarFloresta(form);
   }
  }


  refresh(): void {
    window.location.reload();
    }



}
