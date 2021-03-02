import { ConfirmationService } from 'primeng/components/common/api';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { EmpresaService } from './../empresa.service';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { Component, OnInit } from '@angular/core';
import { Cadempresa } from './../../core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit {

  empresas = [];
  empresasSalvar = new Cadempresa();


  constructor(
    private errorHandler :ErrorHandlerService,
    private toasty: ToastyService,
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private confirm: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoEmpresa  =  this.route.snapshot.params['codigo'];
    this.title.setTitle('Empresa')

     if(codigoEmpresa) {
       this.carregarEmpresa(codigoEmpresa);
     }
  }

  get editando(){

    return Boolean(this.empresasSalvar.cdEmpresa)

  }


  adicionarEmpresa(form: FormControl){
    this.empresaService.adicionar(this.empresasSalvar)
      .then(() => {
        this.toasty.success("Empresa cadastrada com sucesso!");
        form.reset();
       this.refresh();

      })
      .catch(erro => this.errorHandler.handle(erro));
     }

     carregarEmpresa(cdEmpresa: number){
       this.empresaService.buscarPeloCodigoEmp(cdEmpresa)
        .then(empresa => {
          this.empresasSalvar = empresa;
          this.atualizarTituloEdicao();
        })
        .catch(erro => this.errorHandler.handle(erro));
     }

     atualizarEmp(form: FormControl) {
       this.empresaService.atualizar(this.empresasSalvar)
        .then(empresa => {
          this.empresasSalvar = empresa;
          this.toasty.success('Empresa alterada com sucesso!');
          this.router.navigate(['/empresa/cadastro'])

        })
        .catch(erro => this.errorHandler.handle(erro));
     }

     confirmarAlterar(empresa: any){
      this.confirm.confirm( {
        message: 'Tem certeza que deseja alterar?',
        accept: () => {
          this.atualizarEmp(empresa);
         //REDIRECIONA PARA O ADICIONAR O AMF
          this.router.navigate(['/empresa/cadastro']);
        }
      });
     }



     salvar(form: FormControl) {

      if(this.editando){
        this.confirmarAlterar(form);

      } else {
        this.adicionarEmpresa(form);
      }
     }

     atualizarTituloEdicao(){
       this.title.setTitle(`Edição de Empresa: ${this.empresasSalvar.nmEmpresa}`)

     }

        refresh(): void {
          window.location.reload();
          }

    }


