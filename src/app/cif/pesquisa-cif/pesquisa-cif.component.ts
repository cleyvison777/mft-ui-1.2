import { CifService, CifFiltro } from './../cif.service';
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
  @ViewChild('tabela') grid;

  constructor(
    private cifService: CifService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private menuService: MenuService,

  ) { }

  ngOnInit() {
  }

  consultar(page = 0) {
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
          this.consultar();
        } else {
          this.grid.first = 0;
          this.consultar();
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

  carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.cdEmp = empresaSelecionada;
        this.consultar();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
