import { MenuService } from './../../core/menu/menu.service';
import { FormControl } from '@angular/forms';
import { DanoService } from './../dano.service';
import { InvContDano, MenuEmpresa } from './../../core/model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dano-cadastro',
  templateUrl: './dano-cadastro.component.html',
  styleUrls: ['./dano-cadastro.component.css']
})
export class DanoCadastroComponent implements OnInit {

  danoSalva = new InvContDano();
  empresaSelecionada = new MenuEmpresa();
  dano = [];
  cdEmp: any;
  constructor(
    private menuService: MenuService,
    private danoService: DanoService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.carregarEmpresaSelecionadaDano()
    const codigoDano = this.route.snapshot.params['codigo'];
    if(codigoDano) {
      this.carregarDano(codigoDano);

    }

    this.title.setTitle('Dano');

  }

  get editando() {
    return Boolean(this.danoSalva.cdDano);
  }

  pesquisar2(cdEmpresa){
    this.danoService.pesquisa2(cdEmpresa)
     .then(empresaSelecionada => this.dano  = empresaSelecionada)
  }

  carregarEmpresaSelecionadaDano(){
    return  this.menuService.carregarEmpresaSelecionada()
     .then(empresaSelecionada => {
       this.empresaSelecionada.cdEmpresa = empresaSelecionada;
       this.pesquisar2(this.empresaSelecionada.cdEmpresa);
       this.danoSalva.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarDano(form: FormControl) {
    this.danoService.adicionar(this.danoSalva)
     .then(() =>{
      this.toasty.success('Cadastrado realizado com sucesso!');
      this.refresh();

     })
     .catch(erro => this.errorHandler.handle(erro));

  }

  atualizarDano(form: FormControl) {
    this.danoService.atualizar(this.danoSalva)
     .then(dano => {
       this.danoSalva = dano;
       this.toasty.success('Atualização realizada com sucesso!');
       this.router.navigate(['/dano/cadastro']);

     })

     .catch(erro => this.errorHandler.handle(erro));
  }




   //confirmação para alterar
   confirmarAlterar(dano: any) {
    this.confirmation.confirm( {
      message: 'Tem certeza que deseja alterar?',
      accept: () => {
        this.atualizarDano(dano);
      }
    });
  }

  salvar(form: FormControl){
     if(this.editando){
       this.confirmarAlterar(form)
     } else{
      this.adicionarDano(form)
     }

  }


  carregarDano(codigo: number) {
    this.danoService.buscarPeloCodigoInvContDano(codigo)
    .then(dano => {
      this.danoSalva = dano;
      this.atualizarTituloEdicao();

    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição Dano: ${this.danoSalva.nmDano}`)
  }

  refresh(): void {
    window.location.reload();
    }


}
