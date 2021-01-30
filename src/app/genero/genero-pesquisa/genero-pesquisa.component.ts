import { ConfirmationService } from 'primeng/components/common/api';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Genero } from './../../core/model';
import { GeneroFiltro, GeneroService } from './../genero.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-genero-pesquisa',
  templateUrl: './genero-pesquisa.component.html',
  styleUrls: ['./genero-pesquisa.component.css']
})
export class GeneroPesquisaComponent implements OnInit {
  totalRegistrosGenero = 0;
  cadastrofamilia = [];
  listaGenero = [];
  filtro = new GeneroFiltro();
  genero = new Genero;
  @ViewChild('tabela') grid;

  //chamar o dialog
  displayBasic: boolean;
///////

  constructor(
    private generoService: GeneroService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
  ) { }

  ngOnInit() {
  }



   ////chamar o dialog
   showBasicDialog() {
    this.displayBasic = true;
}

    get editando() {
      return Boolean(this.genero.cdGenero);
  }

  consultar(page = 0) {
    this.filtro.page = page;
    this.generoService.consultar(this.filtro)
     .then(resultado => {
       this.totalRegistrosGenero = resultado.total;
       this.listaGenero = resultado.listaGenero;
     })
     .catch(erro => this.errorHandler.handle(erro));

   }

   aoMudarPaginaGenero(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.consultar(page);
  }

  excluir(listaGenero: any) {
    this.generoService.excluir(listaGenero.cdGenero)
     .then(() => {
       if (this.grid.first === 0) {
         this.consultar();
       } else {
         this.grid.first = 0;
         this.consultar();
       }
       this.toasty.success('Genero excluída com sucesso!');
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

      confirmarExclusao(listaGenero: any) {
        this.confirmation.confirm({
          message: 'Tem certeza que deseja excluir?',
          accept: () => {
            this.excluir(listaGenero);
          }
        });
      }


}
