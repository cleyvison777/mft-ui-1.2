import { FormControl } from '@angular/forms';
import { GrupoEcologicoService } from './../grupo-ecologico.service';
import { MenuService } from './../../core/menu/menu.service';
import { CadGrupoEcologico, MenuEmpresa } from './../../core/model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grupo-cadastro',
  templateUrl: './grupo-cadastro.component.html',
  styleUrls: ['./grupo-cadastro.component.css']
})
export class GrupoCadastroComponent implements OnInit {
  listaGrupoEcologico = [];
  cdEmp: any;
  empresas =[];
  cadGrupoEcologicoSalva = new CadGrupoEcologico();
  empresaSelecionada = new MenuEmpresa();

  constructor(
    private errorHandler: ErrorHandlerService,
    private grupoEcologicoService: GrupoEcologicoService,
    private toasty: ToastyService,
    private menuService: MenuService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title

  ) { }

  ngOnInit() {
    this.carregarEmpresaSelecionada();

    this.title.setTitle('Grupo Ecológico')
  }

  get editando(){
    return Boolean(this.cadGrupoEcologicoSalva.cdGrupoEcologico);
  }





  adicionarGrupoEcologico(form: FormControl) {
    this.grupoEcologicoService.adicionar(this.cadGrupoEcologicoSalva)
      .then(() => {
         this.toasty.success('Cadastrado realizado com sucesso!');
         form.reset();
         this.refresh();

      })
      .catch(erro => this.errorHandler.handle(erro));

  }







  pesquisar2(cdEmpresa) {
    this.grupoEcologicoService.pesquisar2(cdEmpresa)
      .then(empresaSelecionada =>  this.listaGrupoEcologico  = empresaSelecionada);
  }

  carregarEmpresaSelecionada(){
    return this.menuService.carregarEmpresaSelecionada()
     .then(empresaSelecionada => {
       this.empresaSelecionada.cdEmpresa = empresaSelecionada;
       this.pesquisar2(this.empresaSelecionada.cdEmpresa);
       this.cadGrupoEcologicoSalva.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa

     })
     .catch(erro => this.errorHandler.handle(erro));
  }





  atualizarTituloEdicao(){
    this.title.setTitle(`Edição Família: ${this.cadGrupoEcologicoSalva.nmGrupoEcologico}`)

  }


   refresh(): void {
    window.location.reload();
    }

}
