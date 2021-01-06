import { EmpresaService, CadempresaFiltro } from './../empresa.service';
import { Component, OnInit } from '@angular/core';
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


  constructor( private empresaService: EmpresaService) { }

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

}
