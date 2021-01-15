import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { EmpresaService } from './../empresa.service';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { Component, OnInit } from '@angular/core';
import { Cadempresa } from './../../core/model';


@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit {

  empresas = [];
  cadEmpresa = new Cadempresa();

  constructor(
    private errorHandler :ErrorHandlerService,
    private toasty: ToastyService,
    private empresaService: EmpresaService,
  ) { }

  ngOnInit() {
  }

  adicionarEmpresa(form: FormControl){
    this.empresaService.adicionar(this.cadEmpresa)
      .then(() => {
        this.toasty.success("Empresa cadastrada com sucesso!");
        form.reset();
        this.cadEmpresa = new Cadempresa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }



}
