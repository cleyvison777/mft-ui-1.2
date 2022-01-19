import { FormControl } from '@angular/forms';
import { DanoService } from './../dano.service';
import { InvContDano, MenuEmpresa } from './../../core/model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dano-cadastro',
  templateUrl: './dano-cadastro.component.html',
  styleUrls: ['./dano-cadastro.component.css']
})
export class DanoCadastroComponent implements OnInit {

  DanoSalva = new InvContDano();
  empresaSelecionada = new MenuEmpresa();

  cdEmp: any;
  constructor(
    private danoService: DanoService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    const codigoDano = this.route.snapshot.params['codigo'];

    if(codigoDano) {
      this.carregarDano(codigoDano);

    }

    this.title.setTitle('Dano');

  }

  get editando() {
    return Boolean(this.DanoSalva.cdDano);
  }

  adicionarDano(form: FormControl) {
    this.danoService.adicionar(this.DanoSalva)
     .then(() =>{
      this.toasty.success('Cadastrado realizado com sucesso!');
      this.refresh();

     })
     .catch(erro => this.errorHandler.handle(erro));

  }

  atualizarDano(form: FormControl) {
    this.danoService.atualizar(this.DanoSalva)
     .then(dano => {
       this.DanoSalva = dano;
       this.toasty.success('Atualização realizada com sucesso!');
       this.router.navigate(['/dano/cadastro']);

     })

     .catch(erro => this.errorHandler.handle(erro));
  }


   //confirmação para alterar
   confirmarAlterar(dano: any) {
    this.confirmation.confirm( {
      message: 'Tem certeza que deseja alterar?',
      accept: () => {
        this.atualizarDano(dano);
      }
    });
  }

  carregarDano(codigo: number) {
    this.danoService.buscarPeloCodigoInvContDano(codigo)
    .then(dano => {
      this.DanoSalva = dano;
      this.atualizarTituloEdicao();

    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição Dano: ${this.DanoSalva.nmDano}`)
  }

  refresh(): void {
    window.location.reload();
    }


}
