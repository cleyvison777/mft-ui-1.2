import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/components/common/api';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from './../../core/menu/menu.service';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { CategoriaProtecaoService } from './../categoria-protecao.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CadCategoriaProtecao, empresaSelecionada, MenuEmpresa } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-protecao-cadastro',
  templateUrl: './protecao-cadastro.component.html',
  styleUrls: ['./protecao-cadastro.component.css']
})
export class ProtecaoCadastroComponent implements OnInit {
  cdEmp: any;
  cadCategoriaProtecao = new CadCategoriaProtecao;
  empresaSelecionada = new MenuEmpresa();
  listaCategoriaProtecao = [];

  constructor(
    private errorHandler: ErrorHandlerService,
    private categoriaProtecaoService: CategoriaProtecaoService,
    private toasty: ToastyService,
    private menuService: MenuService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private title: Title,
    private router: Router

  ) { }

  ngOnInit() {
    this.carregarEmpresaSelecionada();

    const codigoCategoriaProtecao = this.route.snapshot.params['codigo'];
      if(codigoCategoriaProtecao) {
        this.carregarCategoriaProtecao(codigoCategoriaProtecao);
      }
  }
  get editando() {
    return Boolean(this.cadCategoriaProtecao.cdCategoriaProtecao);
  }


  adicionarCategoriaProtecao(form: FormControl) {
    this.categoriaProtecaoService.adicionar(this.cadCategoriaProtecao)
     .then(() => {
       this.cadCategoriaProtecao = new CadCategoriaProtecao();
         this.toasty.success('Cadastrado realizado com sucesso!');
         form.reset();
         this.refresh();
       })
     .catch(erro => this.errorHandler.handle(erro));
  }


  atualizarTituloEdicao(){
    this.title.setTitle(`Edição Grupo Ecológico: ${this.cadCategoriaProtecao.nmCategoriaProtecao}`)
  }



  pesquisar2(cdEmpresa) {
    this.categoriaProtecaoService.pesquisar2(cdEmpresa)
      .then(empresaSelecionada =>  this.listaCategoriaProtecao  = empresaSelecionada);
  }

  carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.empresaSelecionada.cdEmpresa = empresaSelecionada;
        this.pesquisar2(this.empresaSelecionada.cdEmpresa);
        this.cadCategoriaProtecao.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa;
        this.cdEmp = this.cadCategoriaProtecao.cdEmpresa.cdEmpresa;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  atualizarCategoria(form: FormControl) {
    this.categoriaProtecaoService.atualizar(this.cadCategoriaProtecao)
     .then(categoriaprotecao => {
       this.cadCategoriaProtecao = categoriaprotecao;
       this.toasty.success('Atualização realizada com sucesso!');
       this.router.navigate(['/categoria-protecao/cadastro']);
     })
     .catch(erro => this.errorHandler.handle(erro));
  }
     //confirmação para alterar
  confirmarAlterar(cadCategoriaProtecao: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja alterar?',
      accept: () => {
        this.atualizarCategoria(cadCategoriaProtecao);
      }
    });
  }
  carregarCategoriaProtecao(codigo: number) {
    this.categoriaProtecaoService.buscarPeloCodigoCategoria(codigo)
    .then(categoriaprotecao => {
      this.cadCategoriaProtecao = categoriaprotecao;
    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.confirmarAlterar(form);
    } else {
      this.adicionarCategoriaProtecao(form);
    }

  }



   refresh(): void {
    window.location.reload();
    }

}
