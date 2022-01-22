import { FormControl } from '@angular/forms';
import { CipoService } from './../cipo.service';
import { MenuEmpresa, InvContCipo } from './../../core/model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MenuService } from 'src/app/core/menu/menu.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-cipo-cadastro',
  templateUrl: './cipo-cadastro.component.html',
  styleUrls: ['./cipo-cadastro.component.css']
})
export class CipoCadastroComponent implements OnInit {

  cipo = [];
  cdEmp: any;
  invContCipoSalva = new InvContCipo();
  empresaSelecionada = new MenuEmpresa();
  constructor(
    private cipoService: CipoService,
    private menuService: MenuService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.carregarEmpresaSelecionadaCipo();
    this.title.setTitle('Cipó');
    const codigoCipo = this.route.snapshot.params['codigo'];
     if(codigoCipo) {
       this.carregarCipo(codigoCipo)
     }

  }
  get editando() {
    return Boolean(this.invContCipoSalva.cdCipo)
  }

  pesquisar2(cdEmpresa) {
    this.cipoService.pesquisar2(cdEmpresa)
     .then(empresaSelecionada => this.cipo = empresaSelecionada)
  }
  carregarEmpresaSelecionadaCipo() {
     return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.empresaSelecionada.cdEmpresa = empresaSelecionada;
        this.pesquisar2(this.empresaSelecionada.cdEmpresa);
         this.invContCipoSalva.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarCipo(form: FormControl) {
    this.cipoService.adicionar(this.invContCipoSalva)
     .then(() => {
      this.toasty.success('Cadastrado realizado com sucesso!');
      this.refresh();
     })
     .catch(erro => this.errorHandler.handle(erro));
     }


     atualizarCipo(form: FormControl) {
       this.cipoService.atualizar(this.invContCipoSalva)
       .then(cipo => {
         this.invContCipoSalva = cipo;
         this.toasty.success('Atualização realizada com sucesso!');
         this.router.navigate(['/cipo/cadastro']);
       })
       .catch(erro => this.errorHandler.handle(erro));
     }

     confirmarAltera(cipo: any) {
       this.confirmation.confirm({
        message: 'Tem certeza que deseja alterar?',
        accept: () => {
          this.atualizarCipo(cipo)
        }
       });

     }

     salvar(form: FormControl){
      if(this.editando){
        this.confirmarAltera(form)
      } else{
       this.adicionarCipo(form)
      }

   }

     carregarCipo(codigo: number) {
         this.cipoService.buscarPeloCodigoCipo(codigo)
          .then(cipo => {
            this.invContCipoSalva = cipo;
            this.atualizarTituloEdicao();
          })
     }

     atualizarTituloEdicao(){
      this.title.setTitle(`Edição Cipó: ${this.invContCipoSalva.cdCipo}`)
    }

  refresh(): void {
    window.location.reload();
    }



}
