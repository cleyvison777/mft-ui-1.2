import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ClasseTamanhoService } from './../classe-tamanho.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MenuService } from './../../core/menu/menu.service';
import { CadClassTamanhoIndividuo, empresaSelecionada, MenuEmpresa } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classe-tamanho-cadastro',
  templateUrl: './classe-tamanho-cadastro.component.html',
  styleUrls: ['./classe-tamanho-cadastro.component.css']
})
export class ClasseTamanhoCadastroComponent implements OnInit {
  listaClasseTamanho = [];
  cdEmp: any;
  empresaSelecionada = new MenuEmpresa()
  cadClassTamanhoIndividuoSalva = new CadClassTamanhoIndividuo();
  constructor(
    private menuService: MenuService,
    private classeTamanhoIndividoService: ClasseTamanhoService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title

  ) { }

  ngOnInit() {

    const codigoClassTamanho = this.route.snapshot.params['codigo'];
   this.title.setTitle('Classe de tamanho indivíduo')

    //se houver um id entra no metodo de carregar valores
    if(codigoClassTamanho) {
      this.carregarClasseTamanho(codigoClassTamanho);
    }
  }

  get editando(){
    return Boolean(this.cadClassTamanhoIndividuoSalva.cdClasseTamanho);
  }

  // adiciona
  adicionarClassTamanho(form: FormControl) {
    this.classeTamanhoIndividoService.adicionar(this.cadClassTamanhoIndividuoSalva)
     .then(() => {
      this.toasty.success("Classe tamanho cadastrada com sucesso!");
      form.reset();
      this.refresh()
     })
     .catch(erro => this.errorHandler.handle(erro));
  }



  atualizarClasseTamanho(form: FormControl) {
    this.classeTamanhoIndividoService.atualizar(this.cadClassTamanhoIndividuoSalva)
     .then(cadClassTamanhoIndividuo => {
       this.cadClassTamanhoIndividuoSalva = cadClassTamanhoIndividuo;
       this.toasty.success('Classe Tamanho atualizado com sucesso!');
        this.router.navigate(['/classe-tamanho-individuo/cadastro']);
     })
     .catch(erro => this.errorHandler.handle(erro));

  }

   //confirma a alteração
   confirmarAlteraClasseTamanho(cadClassTamanhoIndividuo: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja alterar?',
       accept: () => {
         this.atualizarClasseTamanho(cadClassTamanhoIndividuo);
       }
    });
  }


      //Carregar Valores
   carregarClasseTamanho(codigo: number) {
     this.classeTamanhoIndividoService.buscarClassTamanhoPeloCodigo(codigo)
      .then(cadclassetamanho => {
        this.cadClassTamanhoIndividuoSalva = cadclassetamanho;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));

   }


   salvar(form: FormControl) {
    if(this.editando) {
     this.confirmarAlteraClasseTamanho(form);
    } else {
     this.adicionarClassTamanho(form);
    }
  }

  refresh(): void {
    window.location.reload();
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição Grupo Ecológico: ${this.cadClassTamanhoIndividuoSalva.nmClasseTamanho}`)
  }


}
