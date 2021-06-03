import { MenuService } from 'src/app/core/menu/menu.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CadParcela, empresaSelecionada } from './../../core/model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { parcelaFiltro, ParcelaService } from '../parcela.service';

@Component({
  selector: 'app-parce-pesquisa',
  templateUrl: './parce-pesquisa.component.html',
  styleUrls: ['./parce-pesquisa.component.css']
})
export class ParcePesquisaComponent implements OnInit {
  filtro = new parcelaFiltro;
  parcelas = [];
  totalRegistrosParcela = 0;
  parcelaSalva = new CadParcela();
  cdEmp: any;
  @ViewChild('tabela') grid;


  constructor(
    private parcelaService: ParcelaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private menuService: MenuService,
  ) { }

  ngOnInit() {
  }

  carregarEmpresaSelecionada(){
    return this.menuService.carregarEmpresaSelecionada()
     .then(empresaSelecionada =>{
       this.pesquisaParcela()
     })
     .catch(erro => this.errorHandler.handle(erro));

  }


  pesquisaParcela(page = 0){
      this.filtro.page = page;
       this.filtro.cdEmpresa = this.cdEmp;
         this.parcelaService.pesquisar(this.filtro)
           .then(resultado => {
              this.totalRegistrosParcela =  resultado.total;
               this.parcelas = resultado.parcelas;
           })
           .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent){
    const page = event.first / event.rows;
     this.carregarEmpresaSelecionada();
  }

  excluirParcela(parcelas: any) {
     this.parcelaService.excluir(parcelas.cdParcela)
      .then(() =>{
        if(this.grid.first === 0) {
          this.pesquisaParcela();
        } else {
          this.grid.first = 0;
           this.pesquisaParcela();
        }
        this.toasty.success('Parcela excluída com sucesso!');

      })

      .catch(erro => this.errorHandler.handle(erro));

  }

  confirmarExclusao(parcelas: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
       accept: () => {
         this.excluirParcela(parcelas)
       }
    })
  }
}
