import { ActivatedRoute } from '@angular/router';
import { ClasseFloresta } from './../../core/model';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ClasseFlorestaFiltro, FlorestaService } from './../floresta.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pesquisa-floresta',
  templateUrl: './pesquisa-floresta.component.html',
  styleUrls: ['./pesquisa-floresta.component.css']
})
export class PesquisaFlorestaComponent implements OnInit {

  filtro = new ClasseFlorestaFiltro();
  totalRegistros = 0;
  floresta = [];
  @ViewChild('tabela') grid;
  showDialog: ClasseFloresta;
  img = [];
  classeflorestaSalva = new ClasseFloresta();
  display: boolean = false;
  constructor(
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler :ErrorHandlerService,
    private florestaService: FlorestaService,
    private route: ActivatedRoute,

  ) {  }

  ngOnInit() {


  }
//funcão do botão vizualizar
  showDialo(event: Event, floresta: ClasseFloresta) {
     this.showDialog = floresta;
     this.display = true;
     event.preventDefault();
  }
  onDialogHide() {
    this.showDialog = null;
}
//////

  pesquisaFloresta(page = 0) {
   this.filtro.page = page;
    this.florestaService.pesquisar(this.filtro)
     .then(resultado =>{
        this.totalRegistros = resultado.total;
        this.floresta = resultado.classeFloresta;
     })

     .catch(erro => this.errorHandler.handle(erro));
  }


pesquisarImagem(){
   this.florestaService.pesquisarImagem(this.classeflorestaSalva.cdClassefloresta)
   .then(resultado =>{
    this.totalRegistros = resultado.total;
    this.img = resultado.classeFloresta;
 })

 .catch(erro => this.errorHandler.handle(erro));
}

  aoMudarPagina(event: LazyLoadEvent){
    const page = event.first / event.rows;
    this.pesquisaFloresta(page);
  }

  excluirFloresta(classeFloresta: any){
    this.florestaService.excluir(classeFloresta.cdClassefloresta)
     .then(() =>{
       if (this.grid.first === 0) {
         this.pesquisaFloresta();
       } else {
        this.grid.first = 0;
        this.pesquisaFloresta();
       }
       this.toasty.success('Floresta excluída com sucesso!')
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(classeFloresta: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      header: 'Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        this.excluirFloresta(classeFloresta);
      }
    });
  }

carregarFloresta(codigo: number){
 this.florestaService.buscarPeloCodigo(codigo)
  .then(floresta => {
  this.classeflorestaSalva = floresta;
 })
 .catch(erro => this.errorHandler.handle(erro));
 }

}
