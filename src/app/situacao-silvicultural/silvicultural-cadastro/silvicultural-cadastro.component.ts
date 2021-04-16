import { Title } from '@angular/platform-browser';
import { MenuService } from './../../core/menu/menu.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { SilviculturalService } from './../silvicultural.service';
import { CadTratamentoSilvicultural, MenuEmpresa } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-silvicultural-cadastro',
  templateUrl: './silvicultural-cadastro.component.html',
  styleUrls: ['./silvicultural-cadastro.component.css']
})
export class SilviculturalCadastroComponent implements OnInit {
  listaSilvicultural = [];
  cadTratamentoSilviculturalSalva = new CadTratamentoSilvicultural();
  empresaSelecionada = new MenuEmpresa();

  constructor(
    private menuService: MenuService,
    private situacaoService: SilviculturalService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title


  ) { }

  ngOnInit() {
    this.carregarEmpresaSelecionada();
    this.title.setTitle('Tratamento Silvicultural')
    const codigoSilvicultural = this.route.snapshot.params['codigo'];

    if (codigoSilvicultural) {
       this.carregarSilvicultural(codigoSilvicultural);
    }
  }

  get editando() {
    return Boolean(this.cadTratamentoSilviculturalSalva.cdTratamento);
  }

  adicionarTratamentoSilvicultural(form: FormControl) {
    this.situacaoService.adicionar(this.cadTratamentoSilviculturalSalva)
     .then(() => {
       this.cadTratamentoSilviculturalSalva = new CadTratamentoSilvicultural();
       this.toasty.success('Cadastrado realizado com sucesso!');
        form.reset();
        this.refresh();
     })
     .catch(erro => this.errorHandler.handle(erro));

  }


  refresh(): void {
     window.location.reload();
  }
  pesquisar2(cdEmpresa){
    return this.situacaoService.pesquisar2(cdEmpresa)
     .then(empresaSelecionada => this.listaSilvicultural = empresaSelecionada)
  }

  carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionada()
     .then(empresaSelecionada => {
       this.empresaSelecionada.cdEmpresa = empresaSelecionada
        this.pesquisar2(this.empresaSelecionada.cdEmpresa);
         this.cadTratamentoSilviculturalSalva.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa

     })
     .catch(erro => this.errorHandler.handle(erro));

  }

  atualizarSilvicultural(form: FormControl) {
    this.situacaoService.atualizar(this.cadTratamentoSilviculturalSalva)
    .then(cadTratamentoSilvicultural => {
      this.cadTratamentoSilviculturalSalva = cadTratamentoSilvicultural;
      this.toasty.success('Atualização realizada com sucesso!');
      this.router.navigate(['/situacao-silvicultural/cadastro']);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
  // confirmação para alterar

  confirmarAlterar(cadTratamentoSilvicultural: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja alterar?',
      accept: () => {
        this.atualizarSilvicultural(cadTratamentoSilvicultural)
      }
    });
  }

  carregarSilvicultural(codigo: number, ) {
    this.situacaoService.buscarPeloCogigoSilvicultural(codigo)
      .then(cadTratamentoSilvicultural => {
        this.cadTratamentoSilviculturalSalva = cadTratamentoSilvicultural;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));

  }
  atualizarTituloEdicao(){
    this.title.setTitle(`Edição do tratamento: ${this.cadTratamentoSilviculturalSalva.nmTratamento}`)
  }

  salvar(form: FormControl){
   if(this.editando){
     this.confirmarAlterar(form);
   } else {
     this.adicionarTratamentoSilvicultural(form);
   }
  }

}
