import { EquacaoService } from './../../equacao/equacao.service';
import { ClasseTamanhoService  as ClasseTamanhoIndividuoService} from './../../classe-tamanho-individuo/classe-tamanho.service';
import { MenuItem } from 'primeng/api';
import { AreaService } from './../../area/area.service';
import { FormControl } from '@angular/forms';
import { ClasseTamanhoService } from './../classe-tamanho.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MenuService } from 'src/app/core/menu/menu.service';
import { MenuEmpresa, CadClasseDeTamanho } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tamanho-cadastro',
  templateUrl: './tamanho-cadastro.component.html',
  styleUrls: ['./tamanho-cadastro.component.css']
})
export class TamanhoCadastroComponent implements OnInit {

  classedeTamanho =[];
  classeInd = [];
  cdEmp: any;
  area = [];
  equacoes = [];
  empresaSelecionada = new MenuEmpresa();
  classedeTamanhoSalva = new CadClasseDeTamanho();
  items: MenuItem[];
  activeItem: MenuItem;

  constructor(
    private menuService: MenuService,
    private areaService: AreaService,
    private errorHandler: ErrorHandlerService,
    private classedeTamanhoService: ClasseTamanhoService,
    private classeTamanhoIndividuoService: ClasseTamanhoIndividuoService,
    private equacaoService: EquacaoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Classe de Tamanho')
    this.carregarEmpresaSelecionada();
    this.carregarArea();
    this.carregarClasseIndv();
     this.carregarEquacao();

    this.items = [
      {label: 'Classe tamanho', icon: 'fa-calendar', routerLink: '/classe-tamanho/cadastro'},
      {label: 'Medição', icon: 'fa-bar-chart', routerLink: '/medicao/cadastro'},
  ];

    const codigoClasseTamanho = this.route.snapshot.params['codigo']
     if (codigoClasseTamanho) {
          this.carregarClasseTamanho(codigoClasseTamanho);
     }
  }

  get editando (){
    return Boolean(this.classedeTamanhoSalva.cdClasseTamanho);
  }

  adicionarClassedeTamanho(form: FormControl) {
    this.classedeTamanhoService.adicionar(this.classedeTamanhoSalva)
     .then(() => {
      this.toasty.success("Classe tamanho cadastrada com sucesso!");
         form.reset();
         this.refresh()
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

   carregarEquacao(){
    return this.equacaoService.listarTodasEquacao()
   .then( equacoes => {
     console.log(equacoes);
   })
    .catch(erro => this.errorHandler.handle(erro));
      }

  carregarArea() {
    return this.areaService.listarTodasArea()
    .then( area => {
      this.area = area.map(e => ({label: e.cdarea + " - " + e.nmArea, value: e.cdarea}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarClasseIndv(){
    return this.classeTamanhoIndividuoService.listarTodasClasseIndividuo()
     .then( classeInd =>{
       this.classeInd = classeInd.map(e => ({label: e.cdClasseTamanho + " - " + e.nmClasseTamanho, value: e.cdClasseTamanho}))
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  atualizaClasseTamanho(form: FormControl) {
    this.classedeTamanhoService.atualizar(this.classedeTamanhoSalva)
     .then(classedeTamanho => {
       this.classedeTamanhoSalva = classedeTamanho;
       this.toasty.success('Atualização realizada com sucesso!');
       this.router.navigate(['/classe-tamanho/cadastro']);
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarAlterar(classedeTamanho: any) {
    this.confirmation.confirm({
        message: 'Tem certeza que deseja alterar?',
        accept: () => {
          this.atualizaClasseTamanho(classedeTamanho);
        }
      });
  }

  carregarClasseTamanho(codigo: number){
    this.classedeTamanhoService.buscarPeloCodigo(codigo)
     .then(classedeTamanho => {
       this.classedeTamanhoSalva = classedeTamanho;
       this.atualizarTituloEdicao();
     })
     .catch(erro => this.errorHandler.handle(erro));
  }


  salvar(form: FormControl) {
    if(this.editando) {
      this.confirmarAlterar(form);
    } else {
      this.adicionarClassedeTamanho(form);
    }
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Gênero: ${this.classedeTamanhoSalva.cdClasseTamanho}`)

  }


  pesquisar2(cdEmpresa) {
    this.classedeTamanhoService.pesquisar2(cdEmpresa)
      .then(empresaSelecionada =>  this.classedeTamanho  = empresaSelecionada);
  }

  carregarEmpresaSelecionada(){
    return this.menuService.carregarEmpresaSelecionada()
     .then(empresaSelecionada => {
       this.empresaSelecionada.cdEmpresa = empresaSelecionada;
       this.pesquisar2(this.empresaSelecionada.cdEmpresa);
       this.classedeTamanhoSalva.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa

     })
     .catch(erro => this.errorHandler.handle(erro));
  }


  refresh(): void {
    window.location.reload();
  }



}
