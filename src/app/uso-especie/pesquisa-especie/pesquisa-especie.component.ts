import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { UsoEspecie, MenuEmpresa } from './../../core/model';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { UsoEspecieService, UsoEspecieFiltro } from './../uso-especie.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CadastroEspecieComponent } from '../cadastro-especie/cadastro-especie.component';
import { MenuService } from 'src/app/core/menu/menu.service';

@Component({
  selector: 'app-pesquisa-especie',
  templateUrl: './pesquisa-especie.component.html',
  styleUrls: ['./pesquisa-especie.component.css']
})
export class PesquisaEspecieComponent implements OnInit {
  filtro = new UsoEspecieFiltro;
  cadEspecieUso = [];
  totalRegistrosEspecie = 0;
  usoEspecieSalva = new UsoEspecie;
  cdEmp: any;

  @ViewChild('tabela') grid;

  constructor(
    private usoespecieService: UsoEspecieService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private menuService: MenuService,
  ) { }

  ngOnInit() {

  }

  carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.cdEmp = empresaSelecionada;
        this.pesquisandoUsoEspecie();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisandoUsoEspecie(page = 0){
    this.filtro.page = page;
    this.filtro.cdEmpresa = this.cdEmp;
     this.usoespecieService.pesquisarUsoEspecie(this.filtro)
      .then(resultado => {
        this.totalRegistrosEspecie = resultado.total;
         this.cadEspecieUso = resultado.cadEspecieUso;
      })
      .catch(erro => this.errorHandler.handle(erro));
   }
   aoMudarPaginaEspecieUso(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.carregarEmpresaSelecionada();
   }


     excluindoUsoEspecie(cadUsoEspecie: any){
      this.usoespecieService.excluirUsoEspecie(cadUsoEspecie.cdUso)
       .then(() =>{
         if(this.grid.first === 0){
           this.pesquisandoUsoEspecie();
         } else {
           this.grid.first = 0;
            this.pesquisandoUsoEspecie();
         }
         this.toasty.success('Familia excluída com sucesso!');

       })
       .catch(erro => this.errorHandler.handle(erro));

  }
  confirmarExclusaoUsoEspecie(cadUsoEspecie: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluindoUsoEspecie(cadUsoEspecie);
      }
    });
  }


}
