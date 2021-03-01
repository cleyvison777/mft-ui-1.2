import { FormControl } from '@angular/forms';
import { MenuEmpresa, UsoEspecie } from './../../core/model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { UsoEspecieService } from './../uso-especie.service';
import { MenuService } from './../../core/menu/menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-especie',
  templateUrl: './cadastro-especie.component.html',
  styleUrls: ['./cadastro-especie.component.css']
})
export class CadastroEspecieComponent implements OnInit {

  selecao =[
    {label: 'Comercial', value: 'Comercial'},
    {label: 'Não Comercial', value: 'Não Comercial'}
  ];

  cadEspecieUso = [];
  cdEmp: any;
  empresaSelecionada = new MenuEmpresa();
  usoEspecieSalva = new UsoEspecie();

  constructor(
    private menuService: MenuService,
    private usoespecieService: UsoEspecieService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title

  ) { }

  ngOnInit() {
    this.carregarEmpresaSelecionada();

  }

  get editando (){
    return Boolean(this.usoEspecieSalva.cdUso);
  }


  carregarEmpresaSelecionada() {
    return this.menuService.carregarEmpresaSelecionada()
      .then(empresaSelecionada => {
        this.empresaSelecionada.cdEmpresa = empresaSelecionada;
        this.pesquisar2(this.empresaSelecionada.cdEmpresa);
        this.usoEspecieSalva.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa;
        this.cdEmp = this.usoEspecieSalva.cdEmpresa.cdEmpresa;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisar2(cdEmpresa) {
    this.usoespecieService.pesquisar2(cdEmpresa)
      .then(empresaSelecionada =>  this.cadEspecieUso  = empresaSelecionada);
  }

  adicionandoUsoEspecie(form: FormControl){
    this.usoespecieService.adicionarUsoEspecie(this.usoEspecieSalva)
     .then(() => {
      this.toasty.success("Uso Especie cadastrada com sucesso!");
      form.reset();
      this.refresh()
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Gênero: ${this.usoEspecieSalva.nmUso}`)

  }

  refresh(): void {
    window.location.reload();
  }

}
