import { CifService, CifFiltro, classFiltro } from './../cif.service';
import { MenuService } from 'src/app/core/menu/menu.service';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-pesquisa-cif',
  templateUrl: './pesquisa-cif.component.html',
  styleUrls: ['./pesquisa-cif.component.css']
})
export class PesquisaCifComponent implements OnInit {
  totalRegistrosCif = 0;
  cdEmp: any;
  cif = [];
  filtro = new  CifFiltro();
  filtroInd = new classFiltro();
  @ViewChild('tabela') grid;
  listaClasseTamanho = [];
  totalregistrosClassTamanho = 0;

  constructor(
    private cifService: CifService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private menuService: MenuService,

  ) { }

  ngOnInit() {
    this.carregarEmpresaSelecionada();
  }

  consultarcif(page = 0) {
    this.filtro.page = page;
    this.filtro.cdEmpresa = this.cdEmp;
     this.cifService.consulta(this.filtro)
      .then( resultado => {
      this.totalRegistrosCif = resultado.total;
      this.cif = resultado.cif;

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPaginaCif(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.carregarEmpresaSelecionada();
  }


     excluir(cif: any) {
       this.cifService.excluir(cif.cdCif)
       .then(() => {
        if (this.grid.first === 0) {
          this.consultarcif();
        } else {
          this.grid.first = 0;
          this.consultarcif();
        }
        this.toasty.success('Cif excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
     }


     confirmarExclusao(iluminacao: any){
      this.confirmation.confirm({
        message: 'Tem certeza que deseja excluir ?',
        accept: () => {
          this.excluir(iluminacao);
        }
      })

  }






  consultaClasseTamanho(page = 0){
    this.filtro.page = page;
    // this.filtro.cdEmpresa = this.cdEmp;
    this.cifService.consultarInd(this.filtroInd)
     .then(resultado =>{
       this.cifService = resultado.total;
       this.cifService = resultado.listaClasseTamanho;
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  //paginação
  aoMudarPaginaClasseTamanho(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.consultaClasseTamanho(page);
  }


  excluirClasseIndividuo(listaClasseTamanho: any){
    this.cifService.excluirInd(listaClasseTamanho.cdClasseTamanho)
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

  carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.cdEmp = empresaSelecionada;
        this.consultaClasseTamanho();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


}
