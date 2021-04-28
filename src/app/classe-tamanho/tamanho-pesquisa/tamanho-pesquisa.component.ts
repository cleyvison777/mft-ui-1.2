import { ClasseDeTamanhoService, classeTamanhoFiltro } from './../classe-de-tamanho.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { CadClasseDeTamanho } from './../../core/model';
import { MenuService } from 'src/app/core/menu/menu.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tamanho-pesquisa',
  templateUrl: './tamanho-pesquisa.component.html',
  styleUrls: ['./tamanho-pesquisa.component.css']
})
export class TamanhoPesquisaComponent implements OnInit {

  filtro = new classeTamanhoFiltro;
  classedeTamanho = [];
  totalRegistroTamanho = 0;
  cdEmp: any;
   cadClasseDeTamanhoSalva = new CadClasseDeTamanho();
   @ViewChild('tabela') grid;

  constructor(
    private classeDeTamanhoService: ClasseDeTamanhoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private menuService: MenuService,

    ) { }

  ngOnInit() {

  }

  carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.cdEmp = empresaSelecionada;
       this.pesquisarClasseTamanho();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

   pesquisarClasseTamanho(page = 0){
      this.filtro.page = page;
      this.filtro.cdEmpresa = this.cdEmp;
       this.classeDeTamanhoService.pesquisarClasse(this.filtro)
        .then(resultado =>{
          this.totalRegistroTamanho = resultado.total;
          this.classedeTamanho = resultado.classedeTamanho;
        })
        .catch(erro => this.errorHandler.handle(erro));
   }

   aoMudarPaginaEspecieUso(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.carregarEmpresaSelecionada();
   }

   excluindoClasseTamanho(classedeTamanho: any) {
     this.classeDeTamanhoService.excluir(classedeTamanho.cdClasseTamanho)
      .then(() =>{
        if(this.grid.first === 0) {
          this.pesquisarClasseTamanho();
        } else {
          this.grid.first = 0;
          this.pesquisarClasseTamanho();
        }
        this.toasty.success('Familia excluída com sucesso!');

      })
      .catch(erro => this.errorHandler.handle(erro));

   }

      confirmarExclusaoMedicao(cdClasseTamanho: any) {
        this.confirmation.confirm({
          message: 'Tem certeza que deseja excluir?',
          accept: () => {
            this.excluindoClasseTamanho(cdClasseTamanho);
          }
        });
      }


}
