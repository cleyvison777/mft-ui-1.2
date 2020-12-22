import { EmpresaService, CadempresaFiltro } from './../empresa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pesquisa-empresa',
  templateUrl: './pesquisa-empresa.component.html',
  styleUrls: ['./pesquisa-empresa.component.css']
})
export class PesquisaEmpresaComponent implements OnInit {
totalRegistros = 0;
empresas = [];
filtro = new CadempresaFiltro();


  constructor( private empresaService: EmpresaService) { }

  ngOnInit() {
    this.pesquisaEmpresa();
  }

pesquisaEmpresa (){

  return this.empresaService.pesquisar(this.filtro)
    .then(empresas => this.empresas = empresas)

}

}
