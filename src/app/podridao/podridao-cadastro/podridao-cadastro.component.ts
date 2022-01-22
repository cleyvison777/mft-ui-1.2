import { FormControl } from '@angular/forms';
import { MenuEmpresa } from './../../core/model';
import { ProdricaoService } from './../prodricao.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MenuService } from './../../core/menu/menu.service';
import { Component, OnInit } from '@angular/core';
import { InvContPodridao } from 'src/app/core/model';

@Component({
  selector: 'app-podridao-cadastro',
  templateUrl: './podridao-cadastro.component.html',
  styleUrls: ['./podridao-cadastro.component.css']
})
export class PodridaoCadastroComponent implements OnInit {

 podridao = [];
 cdEmp: any;
 podridaoSalva = new InvContPodridao();
  empresasSelecionada = new MenuEmpresa();

  constructor(
    private menuService: MenuService,
    private prodricaoService: ProdricaoService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    this.carregarEmpresaSelecionadaPodridao();
    const codigoPodridao = this.route.snapshot.params['codigo'];
      if(codigoPodridao) {
        this.carregarPodridao(codigoPodridao)
      }

    this.title.setTitle('Podridão')
  }
  get editando() {
    return Boolean(this.podridaoSalva.cdPodridao);
  }

  pesquisar2(cdEmpresa) {
     this.prodricaoService.pesquisar2(cdEmpresa)
      .then(empresaSelecionada => this.podridao = empresaSelecionada)
  }
  carregarEmpresaSelecionadaPodridao() {
    return this.menuService.carregarEmpresaSelecionada()
    .then(empresaSelecionada =>{
          this.empresasSelecionada.cdEmpresa = empresaSelecionada;
           this.pesquisar2(this.empresasSelecionada.cdEmpresa);
           this.podridaoSalva.cdEmpresa.cdEmpresa = this.empresasSelecionada.cdEmpresa
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

   adicionarPodricao(form: FormControl) {
       this.prodricaoService.adicionar(this.podridaoSalva)
        .then(() => {
          this.toasty.success('Cadastrado realizado com sucesso!');
          this.refresh();
        })
   }

   AtualizarPodridao(form: FormControl) {
      this.prodricaoService.atualizar(this.podridaoSalva)
       .then(podridao => {
         this.podridaoSalva = podridao;
         this.toasty.success('Atualização realizada com sucesso!');
          this.router.navigate(['/podridao/cadastro']);
       })
       .catch(erro => this.errorHandler.handle(erro));
   }

   confirmarAltera(podridao) {
     this.confirmation.confirm({
       message: 'Tem certeza que deseja alterar?',
       accept: () => {
         this.AtualizarPodridao(podridao)
       }
     })
   }

   salvar(form: FormControl){
    if(this.editando){
      this.confirmarAltera(form)
    } else{
     this.adicionarPodricao(form)
    }

 }

   carregarPodridao(codigo:number) {
     this.prodricaoService.buscarPeloCodigoPodricao(codigo)
      .then(podridao => {
        this.podridaoSalva = podridao;
        this.atualizarTituloEdicao();

      })
   }

   atualizarTituloEdicao(){
    this.title.setTitle(`Edição Podridão: ${this.podridaoSalva.cdPodridao}`)
  }

   refresh(): void {
    window.location.reload();
    }


 }
