import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { PesquisaAreaComponent } from './../pesquisa-area/pesquisa-area.component';
import { AreaService } from './../area.service';
import { CadAmf } from './../../core/model';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { EmpresaService } from './../../empresa/empresa.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cadastro-area',
  templateUrl: './cadastro-area.component.html',
  styleUrls: ['./cadastro-area.component.css']
})
export class CadastroAreaComponent implements OnInit {

  empresas =[];
  cadAmf = new CadAmf();
  constructor(
    private errorHandler :ErrorHandlerService,
    private toasty: ToastyService,
    private areaService: AreaService,
    private empresaService: EmpresaService,
    private title: Title
    ) { }

  ngOnInit() {
    this.carregarEmpresas();

    this.title.setTitle('Área de Manejo Florestal-AMF')

  }

  adicionarArea(form: FormControl){
    this.areaService.adicionar(this.cadAmf)
     .then(() => {
      this.toasty.success('Cadastrado realizado com sucesso!');
       form.reset();
       this.cadAmf = new CadAmf();
     })
     .catch(erro => this.errorHandler.handle(erro));
  }


  carregarEmpresas() {
    return this.empresaService.listarTodas()
      .then(empresas => {
        this.empresas = empresas.map(c => ({ label: c.cdEmpresa + " - " + c.nmEmpresa, value: c.cdEmpresa }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
