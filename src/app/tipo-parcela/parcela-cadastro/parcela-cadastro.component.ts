import { FormControl } from '@angular/forms';
import { empresaSelecionada, MenuEmpresa, CadTipoParcela } from './../../core/model';
import { TipoParcelaService } from './../tipo-parcela.service';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MenuService } from './../../core/menu/menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parcela-cadastro',
  templateUrl: './parcela-cadastro.component.html',
  styleUrls: ['./parcela-cadastro.component.css']
})
export class ParcelaCadastroComponent implements OnInit {

  cadEmp: any;
  empresaSelecionada = new MenuEmpresa();
  cadTipoParcelaSalva = new CadTipoParcela;
  listaTipoparcela = [];



  constructor(
    private menuService: MenuService,
    private tipoParcelaService: TipoParcelaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    const codigoTipoParcela = this.route.snapshot.params['codigo'];
    //se houver um id entra no metodo de carregar valores
   if(codigoTipoParcela) {
     this.carregarTipoParcela(codigoTipoParcela);
   }


    this.carregarEmpresaSelecionada();
    this.cadTipoParcelaSalva.lgEstudoCrescimento = false;
    this.title.setTitle('Tipo Parcela')

  }
  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Parcela: ${this.cadTipoParcelaSalva.nmTipoParcela}`)

  }


  get editando(){
    return Boolean(this.cadTipoParcelaSalva.cdTipoParcela);
  }

  // adiciona tipo parcela
  adicionandoTipoParcela(form: FormControl) {
    this.tipoParcelaService.adicionarTipoParcela(this.cadTipoParcelaSalva)
     .then(() => {
      this.toasty.success("Tipo Parcela cadastrada com sucesso!");
      form.reset();
      this.refresh()
    })
     .catch(erro => this.errorHandler.handle(erro));
  }



   //atualiza tipo parcela
   atualizarTipoparcela(form: FormControl) {
    this.tipoParcelaService.atualizar(this.cadTipoParcelaSalva)
     .then( cadTipoParcela => {
       this.cadTipoParcelaSalva = cadTipoParcela;
       this.toasty.success('Familia atualizada com sucesso!');
         this.router.navigate(['/tipo-parcela/cadastro']);
     })
     .catch(erro => this.errorHandler.handle(erro));
  }
  //confirma a alteração
  confirmarAlterarTipoParcela(cadTipoParcela: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja alterar?',
       accept: () => {
         this.atualizarTipoparcela(cadTipoParcela);
       }
    });
  }

  salvar(form: FormControl) {
    if(this.editando) {
      this.confirmarAlterarTipoParcela(form);

    } else {
      this.adicionandoTipoParcela(form);
    }
  }

  //Carregar Valores
  carregarTipoParcela(codigo: number) {
    this.tipoParcelaService.buscarTipoParcelaPeloCodigo(codigo)
     .then(cadastrotipoparcela => {
       this.cadTipoParcelaSalva = cadastrotipoparcela;
       this.atualizarTituloEdicao();
     })
     .catch(erro => this.errorHandler.handle(erro));

  }



  pesquisar2(cdEmpresa) {
    this.tipoParcelaService.pesquisar2(cdEmpresa)
      .then(empresaSelecionada =>  this.listaTipoparcela  = empresaSelecionada);
  }

  carregarEmpresaSelecionada(){
    return this.menuService.carregarEmpresaSelecionada()
     .then(empresaSelecionada => {
       this.empresaSelecionada.cdEmpresa = empresaSelecionada;
       this.pesquisar2(this.empresaSelecionada.cdEmpresa);
       this.cadTipoParcelaSalva.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa

     })
     .catch(erro => this.errorHandler.handle(erro));
  }


  refresh(): void {
    window.location.reload();
  }

}
