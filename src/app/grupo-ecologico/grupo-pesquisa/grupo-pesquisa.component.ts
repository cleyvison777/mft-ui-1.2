import { MenuEmpresa } from './../../core/model';
import { MenuService } from './../../core/menu/menu.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { GrupoEcologicoFiltro, GrupoEcologicoService } from './../grupo-ecologico.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-grupo-pesquisa',
  templateUrl: './grupo-pesquisa.component.html',
  styleUrls: ['./grupo-pesquisa.component.css']
})
export class GrupoPesquisaComponent implements OnInit {

  filtro = new GrupoEcologicoFiltro();

  totalRegistrosGrupoEcologico = 0;
  listaGrupoEcologico = [];
  @ViewChild('tabela') grid;

  constructor(
    private grupoEcologicoService: GrupoEcologicoService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
  ) { }

  ngOnInit() {
  }


  consultarGrupoEcologico(page = 0){
    this.filtro.page = page;
    this.grupoEcologicoService.consulta(this.filtro)
     .then(resultado => {
       this.totalRegistrosGrupoEcologico = resultado.total;
       this.listaGrupoEcologico = resultado.cadgrupoEcologico;
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPaginaGrupoEcologico(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.consultarGrupoEcologico(page);
  }


  excluir(listaGrupoEcologico: any) {
    this.grupoEcologicoService.excluir(listaGrupoEcologico.cdGrupoEcologico)
    .then(() => {
      if(this.grid.first === 0) {
        this.consultarGrupoEcologico();
      } else {
        this.grid.first = 0;
        this.consultarGrupoEcologico();
      }
      this.toasty.success('Genero excluída com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(listaGrupoEcologico: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(listaGrupoEcologico);
      }
    });
  }

}
