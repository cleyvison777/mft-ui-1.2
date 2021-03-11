import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MedicaoService } from './../medicao.service';
import { MenuService } from 'src/app/core/menu/menu.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { CadMedicao } from './../../core/model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { medicaoFiltro } from '../medicao.service';

@Component({
  selector: 'app-medicao-pesquisa',
  templateUrl: './medicao-pesquisa.component.html',
  styleUrls: ['./medicao-pesquisa.component.css']
})
export class MedicaoPesquisaComponent implements OnInit {
filtro = new medicaoFiltro;
cadMedicao = [];
totalRegistrosMedicao = 0;
cdEmp: any;
cadMedicaoSalva = new CadMedicao();
@ViewChild('tabela') grid;

  constructor(
    private medicaoService: MedicaoService,
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
        this.pesquisarMedicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarMedicao(page = 0) {
    this.filtro.page = page;
    this.filtro.cdEmpresa = this.cdEmp;
     this.medicaoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistrosMedicao = resultado.total;
         this.cadMedicao = resultado.cadMedicao;
      })
      .catch(erro => this.errorHandler.handle(erro));


  }

  aoMudarPaginaEspecieUso(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.carregarEmpresaSelecionada();
   }

   excluindoMedicao(cadMedicao: any){
     this.medicaoService.excluir(cadMedicao.cdMedicao)
      .then(() =>{
        if(this.grid.first === 0) {
          this.pesquisarMedicao();
        } else {
          this.grid.first = 0;
          this.pesquisarMedicao();
        }
        this.toasty.success('Familia excluída com sucesso!');

      })
      .catch(erro => this.errorHandler.handle(erro));

   }

   confirmarExclusaoMedicao(cadMedicao: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluindoMedicao(cadMedicao);
      }
    });
  }
}
