import { FormControl } from '@angular/forms';
import { FormaCopaService } from './../forma-copa.service';
import { InvContFormaCopa, MenuEmpresa } from './../../core/model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MenuService } from './../../core/menu/menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forma-cadastro',
  templateUrl: './forma-cadastro.component.html',
  styleUrls: ['./forma-cadastro.component.css']
})
export class FormaCadastroComponent implements OnInit {

  copa = [];
  cdEmp: any;
  formaCopaSalva = new InvContFormaCopa();
  empresaSelecionada = new MenuEmpresa();


  constructor(
    private formaCopaService: FormaCopaService,
    private menuService: MenuService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.carregarEmpresaSelecionadaCopa();
    this.title.setTitle('Forma Copa');
    const codigoFormaCopa = this.route.snapshot.params['codigo'];
    if(codigoFormaCopa) {
      this.carregarFormaCopa(codigoFormaCopa);
    }
  }

  get editando() {
    return Boolean(this.formaCopaSalva.cdFormaCopa);
  }

  pesquisar2(cdEmpresa) {
    this.formaCopaService.pesquisar2(cdEmpresa)
     .then(empresaSelecionada => this.copa = empresaSelecionada);

  }

  carregarEmpresaSelecionadaCopa() {
    return this.menuService.carregarEmpresaSelecionada()
     .then( empresaSelecionada => {
       this.empresaSelecionada.cdEmpresa = empresaSelecionada;
       this.pesquisar2(this.empresaSelecionada.cdEmpresa);
       this.formaCopaSalva.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa

     })
     .catch(erro => this.errorHandler.handle(erro));
}

  adicionarCopa(form: FormControl) {
    this.formaCopaService.adicionar(this.formaCopaSalva)
     .then(() => {
      this.toasty.success('Cadastrado realizado com sucesso!');
      this.refresh();

     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarFormaCopa(form: FormControl){
    this.formaCopaService.atualizar(this.formaCopaSalva)
     .then(copa => {
       this.formaCopaSalva = copa;
       this.toasty.success('Atualização realizada com sucesso!');
       this.router.navigate(['/forma-copa/cadastro']);
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarAltera(copa: any){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja alterar?',
      accept: () => {
        this.atualizarFormaCopa(copa)
      }
    });
  }
  carregarFormaCopa(codigo:number) {
    this.formaCopaService.buscarPeloCodigoFormaCopa(codigo)
     .then(copa => {
       this.formaCopaSalva = copa;
       this.atualizarTituloEdicao();
     })
 }
  atualizarTituloEdicao() {
   this.title.setTitle(`Edição Forma Copa: ${this.formaCopaSalva.cdFormaCopa}`)
  }

  salvar(form: FormControl){
    if(this.editando){
      this.confirmarAltera(form)
    } else{
     this.adicionarCopa(form)
    }

 }

  refresh(): void {
    window.location.reload();
    }

}
