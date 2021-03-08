import { ConfirmationService } from 'primeng/components/common/api';
import { MenuService } from './../../core/menu/menu.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ClassIndividuoFiltro, ClasseTamanhoService } from './../classe-tamanho.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-classe-tamanho-pesquisa',
  templateUrl: './classe-tamanho-pesquisa.component.html',
  styleUrls: ['./classe-tamanho-pesquisa.component.css']
})
export class ClasseTamanhoPesquisaComponent implements OnInit {
  cdEmp: any;
  totalregistrosClassTamanho = 0;
  listaClasseTamanho = [];
  filtro = new ClassIndividuoFiltro();
  @ViewChild('tabela') grid;
  constructor(
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private classeTamanhoIndividoService: ClasseTamanhoService,
    private menuService: MenuService

  ) { }

  ngOnInit() {

  }

  // carregarEmpresaSelecionada() {
  //   return this.menuService.carregarEmpresaSelecionada()
  //     .then(empresaSelecionada => {
  //       this.cdEmp = empresaSelecionada;
  //       this.consultaClasseTamanho();
  //     })
  //     .catch(erro => this.errorHandler.handle(erro));
  // }

  consultaClasseTamanho(page = 0){
    this.filtro.page = page;
    // this.filtro.cdEmpresa = this.cdEmp;
    this.classeTamanhoIndividoService.consultar(this.filtro)
     .then(resultado =>{
       this.totalregistrosClassTamanho = resultado.total;
       this.listaClasseTamanho = resultado.listaClasseTamanho;
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  //paginação
  aoMudarPaginaClasseTamanho(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.consultaClasseTamanho(page);
  }


  excluirClasseIndividuo(listaClasseTamanho: any){
    this.classeTamanhoIndividoService.excluir(listaClasseTamanho.cdClasseTamanho)
     .then(()=> {
       if(this.grid.first === 0){
         this.consultaClasseTamanho();
       } else {
        this.grid.first = 0;
        this.consultaClasseTamanho();
       }
       this.toasty.success('Classe Tamanho excluída com sucesso!');
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusaoClasseTamanho(listaClasseTamanho: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluirClasseIndividuo(listaClasseTamanho);
      }
    });
  }

}
