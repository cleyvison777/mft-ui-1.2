import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { CadFamilia } from './../../core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { FamiliaService } from './../familia.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-familia',
  templateUrl: './cadastro-familia.component.html',
  styleUrls: ['./cadastro-familia.component.css']
})
export class CadastroFamiliaComponent implements OnInit {
  familiaSalva = new CadFamilia;
  constructor(
    private familiaService: FamiliaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title

  ) { }

  ngOnInit() {

    const codigoFamilia = this.route.snapshot.params['codigo'];
    this.title.setTitle('Família')
    //se houver um id entra no metodo de carregar valores
   if(codigoFamilia) {
    this.carregarFamilia(codigoFamilia);

       }
  }

  get editando() {
    return Boolean(this.familiaSalva.cdFamilia);
  }


  adicionandoFamilia(form: FormControl) {
    this.familiaService.adicionarFamilia(this.familiaSalva)
     .then(() => {
    this.toasty.success("Família cadastrada com sucesso!");
    form.reset();
    this.refresh();

     })
     .catch(erro => this.errorHandler.handle(erro));
  }


  salvar(form: FormControl) {

    if(this.editando) {
      this.confirmarAlterarFamilia(form);
    } else {
      this.adicionandoFamilia(form);
    }

  }

  atualizandoFamilia(form: FormControl) {
    this.familiaService.atualizarFamilia(this.familiaSalva)
     .then(cadfamilia => {
       this.familiaSalva = cadfamilia;
       this.toasty.success('Familia atualizada com sucesso!');
       this.router.navigate(['/cadastro-familia']);
     })
     .catch(erro => this.errorHandler.handle(erro));
  }
  confirmarAlterarFamilia(cadfamilia: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja alterar?',
       accept: () => {
         this.atualizandoFamilia(cadfamilia);
       }
    });
  }


    //Carregar Valores
    CarregarGenero(codigo: number) {
    this.familiaService.buscarPeloCadigo(codigo)
    .then(cadastrofamilia => {
      this.familiaSalva = cadastrofamilia;
    })
    .catch(erro => this.errorHandler.handle(erro));
    }

  carregarFamilia(cdFamilia: number) {
    this.familiaService.buscarPeloCadigo(cdFamilia)
     .then(familia =>  {
       this.familiaSalva = familia;
       this.atualizarTituloEdicao();

     })
     .catch(erro => this.errorHandler.handle(erro));
 }

 atualizarTituloEdicao(){
  this.title.setTitle(`Edição Família: ${this.familiaSalva.nmFamilia}`)

}


 refresh(): void {
  window.location.reload();
  }

}
