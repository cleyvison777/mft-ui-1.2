import { FieldsetModule } from 'primeng/fieldset';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { CadFamilia } from './../../core/model';
import { ConfirmationService, SelectItem } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CadastroFamiliaFiltro, FamiliaService } from './../familia.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-pesquisa-familia',
  templateUrl: './pesquisa-familia.component.html',
  styleUrls: ['./pesquisa-familia.component.css']
})
export class PesquisaFamiliaComponent implements OnInit {

totalRegistrosFamilia = 0;
 filtro = new CadastroFamiliaFiltro();
 familia = [];
 @ViewChild('tabela') grid;
  constructor(

    private familiaService: FamiliaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,

  ) { }


  ngOnInit() {

  }

  pesquisarFamilia(page = 0) {
    this.filtro.page = page;
    this.familiaService.pesquisaFamilia(this.filtro)
     .then(resultado => {
        this.totalRegistrosFamilia = resultado.total;
        this.familia = resultado.cadastrofamilia;
     })
     .catch(erro => this.errorHandler.handle(erro));
        }


        aoMudarPaginaFamilia(event: LazyLoadEvent) {
         const page = event.first / event.rows;
         this.pesquisarFamilia(page);
       }

       excluindoFamilia(cadastrofamilia: any){
        this.familiaService.excluirFamilia(cadastrofamilia.cdFamilia)
         .then(() => {
           if (this.grid.first === 0) {
             this.pesquisarFamilia();
           } else {
            this.grid.first = 0;
            this.pesquisarFamilia();
           }
           this.toasty.success('Familia excluída com sucesso!');
         })
         .catch(erro => this.errorHandler.handle(erro));
      }
      confirmarExclusaoFamilia(cadastrofamilia: any) {
        this.confirmation.confirm({
          message: 'Tem certeza que deseja excluir?',
          accept: () => {
            this.excluindoFamilia(cadastrofamilia);
          }
        });
      }

}

