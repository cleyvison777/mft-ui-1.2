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
    const codigoUsoEspecie =  this.route.snapshot.params['codigo'];
    if(codigoUsoEspecie) {
      this.carregarUsoEspecie(codigoUsoEspecie);
    }
  }

  get editando (){
    return Boolean(this.usoEspecieSalva.cdUso);
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

  atualizandoUsoEspecie(form: FormControl) {
    this.usoespecieService.atualizarUsoespecie(this.usoEspecieSalva)
     .then(cadEspecieUso => {
       this.usoEspecieSalva = cadEspecieUso;
       this.toasty.success('Atualização realizada com sucesso!');
       this.router.navigate(['/uso-especie/cadastro']);

     })
     .catch(erro => this.errorHandler.handle(erro));
  }

   //confirmação para alterar


confirmarAlterar(cadEspecieUso: any) {
  this.confirmation.confirm({
      message: 'Tem certeza que deseja alterar?',
      accept: () => {
        this.atualizandoUsoEspecie(cadEspecieUso);
      }
    });
}

carregarUsoEspecie(codigo: number) {
  this.usoespecieService.buscarPeloCodigoUsoEspecie(codigo)
   .then(cadEspecieUso => {
    this.usoEspecieSalva = cadEspecieUso
    })
    .catch(erro => this.errorHandler.handle(erro));
   }

   salvar(form: FormControl) {
     if(this.editando) {
       this.confirmarAlterar(form);
     } else {
       this.adicionandoUsoEspecie(form);
     }
   }


  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Gênero: ${this.usoEspecieSalva.nmUso}`)

  }

  refresh(): void {
    window.location.reload();
  }

}
