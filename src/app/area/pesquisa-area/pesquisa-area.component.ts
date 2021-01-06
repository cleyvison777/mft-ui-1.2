import { ToastyService } from 'ng2-toasty';
import { AreaService, CadAreaFiltro } from './../area.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

@Component({
  selector: 'app-pesquisa-area',
  templateUrl: './pesquisa-area.component.html',
  styleUrls: ['./pesquisa-area.component.css']
})
export class PesquisaAreaComponent implements OnInit {

filtro = new CadAreaFiltro();
totalRegistros = 0;
empresas = [];
area = [];
@ViewChild('tabela') grid;

  constructor(private areaService: AreaService,
              private toasty: ToastyService,) { }

  ngOnInit() {
    this.pesquisarArea();
  }

  pesquisarArea(page = 0){
    this.filtro.page = page;
     this.areaService.pequisar(this.filtro)
      .then(resultado =>{
        this.totalRegistros = resultado.total;
        this.area = resultado.cadarea;
      });
  }

  aoMudarPagina(event: LazyLoadEvent){
    const page = event.first / event.rows;
    this.pesquisarArea(page);
  }

  excluirAmf(area: any){
    this.areaService.excluir(area.cdarea)
     .then(() => {
      if (this.grid.first === 0) {
        this.pesquisarArea();
      } else {
        this.grid.first = 0;
        this.pesquisarArea();
       }
      this.toasty.success('Area excluída com sucesso!');
     })
     //??
  }


}
