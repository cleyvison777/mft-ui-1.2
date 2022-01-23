import { FormControl } from '@angular/forms';
import { InvContIluminacao, MenuEmpresa } from './../../core/model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { IluminacaoService } from './../iluminacao.service';
import { MenuService } from 'src/app/core/menu/menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iluminacao-cadastro',
  templateUrl: './iluminacao-cadastro.component.html',
  styleUrls: ['./iluminacao-cadastro.component.css']
})
export class IluminacaoCadastroComponent implements OnInit {

  iluminacao = [];
  cdEmp: any;
  iluminacaoSalva = new InvContIluminacao();
  empresaSelecionada = new MenuEmpresa();

  constructor(
    private menuService: MenuService,
    private iluminacaoService: IluminacaoService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.carregarEmpresaSelecionadaIluminacao()
     const codigoIluminacao = this.route.snapshot.params['codigo'];
     if(codigoIluminacao) {
       this.carregarIluminacao(codigoIluminacao);
     }
    this.title.setTitle('Iluminação')
  }


  get editando() {
    return Boolean(this.iluminacaoSalva.cdIluminacao);
  }

 pesquisar2(cdEmpresa){
   this.iluminacaoService.pesquisar2(cdEmpresa)
    .then(empresaSelecionada => this.iluminacao = empresaSelecionada)
 }


 carregarEmpresaSelecionadaIluminacao() {
     return this.menuService.carregarEmpresaSelecionada()
      .then( empresaSelecionada => {
        this.empresaSelecionada.cdEmpresa = empresaSelecionada;
        this.pesquisar2(this.empresaSelecionada.cdEmpresa);
        this.iluminacaoSalva.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa

      })
      .catch(erro => this.errorHandler.handle(erro));
 }

 adicionarIluminacao(form: FormControl) {
   this.iluminacaoService.adiconar(this.iluminacaoSalva)
    .then(() =>{
      this.toasty.success('Cadastrado realizado com sucesso!');
      this.refresh();
    })
    .catch(erro => this.errorHandler.handle(erro));
 }

     atualizarIluminacao(form: FormControl){
       this.iluminacaoService.atualizar(this.iluminacaoSalva)
        .then(iluminacao => {
          this.iluminacaoSalva = iluminacao;
          this.toasty.success('Atualização realizada com sucesso!');
          this.router.navigate(['/iluminacao/cadastro']);
        })
        .catch(erro => this.errorHandler.handle(erro));
     }

     confirmarAltera(iluminacao: any){
       this.confirmation.confirm({
         message: 'Tem certeza que deseja alterar?',
         accept: () => {
           this.atualizarIluminacao(iluminacao)
         }
       });
     }

     carregarIluminacao(codigo:number) {
        this.iluminacaoService.buscarPeloCodigoIluminacao(codigo)
         .then(iluminacao => {
           this.iluminacaoSalva = iluminacao;
           this.atualizarTituloEdicao();
         })
     }



  salvar(form: FormControl){
    if(this.editando){
      this.confirmarAltera(form)
    } else{
     this.adicionarIluminacao(form)
    }

 }

     atualizarTituloEdicao(){
      this.title.setTitle(`Edição Iluminacao: ${this.iluminacaoSalva.cdIluminacao}`)
      }

    refresh(): void {
      window.location.reload();
      }


}
