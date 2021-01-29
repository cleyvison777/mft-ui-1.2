import { EmpresaService } from './../../empresa/empresa.service';
import { EspecieService } from './../especie.service';
import { CadListaEspecie } from './../../core/model';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/components/common/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-especie-cadastro',
  templateUrl: './especie-cadastro.component.html',
  styleUrls: ['./especie-cadastro.component.css']
})
export class EspecieCadastroComponent implements OnInit {

listaespecie = [];
 empresas = [];
 listaEspecieSalva = new CadListaEspecie;
//chamar o dialog
displayBasic: boolean;
  constructor(
    private listaEspecieService: EspecieService,
    private errorHandler :ErrorHandlerService,
    private toasty: ToastyService,
    private empresaService: EmpresaService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private confirm: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
  }

  ////chamar o dialog
showBasicDialog() {
  this.displayBasic = true;
}

get editanto() {
  return Boolean(this.listaEspecieSalva.cdListaEsp);
}


  adicionandoListaEspecie(form: FormControl) {
    this.listaEspecieService.adicionarListaEspecie(this.listaEspecieSalva)
     .then(() => {
       this.listaEspecieSalva = new CadListaEspecie();
        this.toasty.success('Cadastrado realizado com sucesso!');
        form.reset();
        this.refresh();

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
  atualizandoListaEspecie(form: FormControl) {
    this.listaEspecieService.atualizarListaEspecie(this.listaEspecieSalva)
     .then(listaespecie => {
       this.listaEspecieSalva = listaespecie;
       this.toasty.success('Atualização realizada com sucesso!');
        this.router.navigate(['/lista-especie/cadastro']);
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  //confirmação para alterar
  confirmarAlterar(listaespecie: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja alterar?',
       accept: () => {
         this.atualizandoListaEspecie(listaespecie);
       }
    });
   }
//Carregar Valores
   carregarListaEspecie(codigo: number) {
     this.listaEspecieService.buscarPeloCodigoListaEspecie(codigo)
      .then(listaespecie => {
        this.listaEspecieSalva = listaespecie;
      })
      .catch(erro => this.errorHandler.handle(erro));

   }

   //verifica se e uma atualizção ou um novo cadastro
      salvar(form: FormControl) {
        if ( this.editanto) {
          this.confirmarAlterar(form);
        } else {
          this.adicionandoListaEspecie(form);
        }

      }



  refresh(): void {
    window.location.reload();
    }

}

