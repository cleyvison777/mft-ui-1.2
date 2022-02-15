import { FormControl } from '@angular/forms';
import { CifService } from './../cif.service';
import { Title } from '@angular/platform-browser';
import { MenuEmpresa, InvContCIF } from './../../core/model';
import { MenuService } from 'src/app/core/menu/menu.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { TsatualtsanteriorService } from './../../tsatualtsanterior/tsatualtsanterior.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { ClasseTamanhoService  as ClasseTamanhoIndividuoService} from './../../classe-tamanho-individuo/classe-tamanho.service';

@Component({
  selector: 'app-cadastro-cif',
  templateUrl: './cadastro-cif.component.html',
  styleUrls: ['./cadastro-cif.component.css']
})
export class CadastroCifComponent implements OnInit {
  classeInd = [];
  empresaSelecionada = new MenuEmpresa();
  invContCIFSalva = new InvContCIF();
cif = [];
  constructor(
    private classeTamanhoIndividuoService: ClasseTamanhoIndividuoService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private cifService: CifService,
    private confirmation: ConfirmationService,
    private menuService: MenuService,
    private tsService: TsatualtsanteriorService,
    private route: ActivatedRoute,
    private title: Title,
    private router: Router,



  ) { }

  ngOnInit( ) {
  this.carregarEmpresaSelecionada();
  this.carregarClasseIndv();
  this.title.setTitle('Classe de indentificação do fuste');
  this.invContCIFSalva.lgDesaparecida = false;
  this.invContCIFSalva.lgEgressa = false;
  this.invContCIFSalva.lgTemDescricaoFuste = false;
  this.invContCIFSalva.lgViva = false;

  const codigoCif = this.route.snapshot.params['codigo'];
    if(codigoCif) {
      this.carregarCif(codigoCif)

    }

  }

  get editando() {
    return Boolean(this.invContCIFSalva.cdCif);
  }

  pesquisar2(cdEmpresa){
    return this.cifService.pesquisar2(cdEmpresa)
     .then(empresaSelecionada => this.cif = empresaSelecionada)
  }

  carregarEmpresaSelecionada() {
      return this.menuService.carregarEmpresaSelecionada()
       .then(empresaSelecionada => {
        this.empresaSelecionada.cdEmpresa = empresaSelecionada;
         this.pesquisar2(this.empresaSelecionada.cdEmpresa);
         this.invContCIFSalva.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa;
       })
  }


  carregarClasseIndv(){
    return this.classeTamanhoIndividuoService.listarTodasClasseIndividuo()
     .then( classeInd =>{
       this.classeInd = classeInd.map(e => ({label: e.cdClasseTamanho + " - " + e.nmClasseTamanho, value: e.cdClasseTamanho}))
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

adicionarCif(form: FormControl) {
  this.cifService.adiconar(this.invContCIFSalva)
   .then(() =>{
     this.invContCIFSalva = new InvContCIF();
     this.toasty.success('Cadastrado realizado com sucesso!');
     form.reset();
     this.refresh();

   })
   .catch(erro => this.errorHandler.handle(erro));
}


  atualizarCif( form: FormControl){
      this.cifService.atualizar(this.invContCIFSalva)
        .then(cif =>{
          this.invContCIFSalva = cif;
          this.toasty.success('Atualização realizada com sucesso!');
          this.router.navigate(['/identificacao-fuste/cadastro']);
        })
        .catch(erro => this.errorHandler.handle(erro));
  }

 confirmarAlterar(cif: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja alterar?',
      accept: () => {
        this.atualizarCif(cif);
      }
    })
 }


 carregarCif(codigo: number) {
   this.cifService.buscarPeloCodigoCif(codigo)
    .then(cif => {
        this.invContCIFSalva = cif;
        this.atualizarTituloEdicao();
    })
 }

 salvar(form: FormControl) {
   if(this.editando){
     this.confirmarAlterar(form)
   }else {
     this.adicionarCif(form)
   }
 }

 atualizarTituloEdicao(){
  this.title.setTitle(`Edição Dano: ${this.invContCIFSalva.nmCif}`)
}

  refresh(): void {
    window.location.reload();
  }

}
