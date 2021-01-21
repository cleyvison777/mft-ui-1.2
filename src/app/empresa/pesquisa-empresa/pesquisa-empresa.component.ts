import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { EmpresaService, CadempresaFiltro } from './../empresa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

@Component({
  selector: 'app-pesquisa-empresa',
  templateUrl: './pesquisa-empresa.component.html',
  styleUrls: ['./pesquisa-empresa.component.css']
})
export class PesquisaEmpresaComponent implements OnInit {
filtro = new CadempresaFiltro();
totalRegistros = 0;
empresas = [];
@ViewChild('tabela') grid;


  constructor( private empresaService: EmpresaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler :ErrorHandlerService) { }

  ngOnInit() {
    this.pesquisaEmpresa();
  }

//metodo para fazer pesquisa sem paginação
  // pesquisaEmpresa (){
  //   return this.empresaService.pesquisar({  nmEmpresa: this.nmEmpresa })
  //     .then(empresas => this.empresas = empresas)
  //   }
///////////////////////////////////////

pesquisaEmpresa ( page = 0 ) {
  this.filtro.page = page;
    this.empresaService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.empresas = resultado.cadempresa;
  });

  }
    aoMudarPagina(event: LazyLoadEvent){
      const page = event.first / event.rows;
      this.pesquisaEmpresa(page);
    }

    excluirEmpresa(empresas: any) {
      this.empresaService.excluir(empresas.cdEmpresa)
       .then(() => {
         if (this.grid.first === 0) {
          this.pesquisaEmpresa();
         } else {
          this.grid.first = 0;
          this.pesquisaEmpresa();
         }
         this.toasty.success('Empresa excluída com sucesso!')
       })
       .catch(erro => this.errorHandler.handle(erro));
    }

    confirmarExclusaoEmpresa(empresas: any) {
      this.confirmation.confirm({
        message: 'Tem certeza que deseja excluir?',
        header: 'Confirmação',
        accept: () => {
          this.excluirEmpresa(empresas);
        }
      });
    }

}
