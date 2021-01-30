import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { FormControl } from '@angular/forms';
import { Genero } from './../../core/model';
import { FamiliaService } from './../../familia/familia.service';
import { GeneroService, GeneroFiltro } from './../genero.service';
import { Title } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/components/common/api';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from './../../empresa/empresa.service';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-genero-cadastro',
  templateUrl: './genero-cadastro.component.html',
  styleUrls: ['./genero-cadastro.component.css']
})

export class GeneroCadastroComponent implements OnInit {
  totalRegistrosGenero = 0;
  cadastrofamilia = [];
  listaGenero = [];
  genero = new Genero;
  filtro = new GeneroFiltro();
  //chamar o dialog
  displayBasic: boolean;
///////


constructor(
  private generoService: GeneroService,
  private familiaService: FamiliaService,
  private errorHandler: ErrorHandlerService,
  private toasty: ToastyService,
  private confirmation: ConfirmationService,
  private route: ActivatedRoute,
  private router: Router,
  private title: Title) { }


  ngOnInit() {
    this.carregarFamilia();
    this.title.setTitle('Gênero')
       //se houver um id entra no metodo de carregar valores
const cadigoGenero = this.route.snapshot.params['codigo'];
   if (cadigoGenero) {
      this.CarregarGenero(cadigoGenero);
      }

  }
  ////chamar o dialog
  showBasicDialog() {
    this.displayBasic = true;
}
  get editando() {
    return Boolean(this.genero.cdGenero);
  }

  consultar(page = 0) {
    this.filtro.page = page;
    this.generoService.consultar(this.filtro)
     .then(resultado => {
       this.totalRegistrosGenero = resultado.total;
       this.listaGenero = resultado.listaGenero;
     })
     .catch(erro => this.errorHandler.handle(erro));

   }
    aoMudarPaginaGenero(event: LazyLoadEvent) {
      const page = event.first / event.rows;
      this.consultar(page);
    }
   //adiconar registro
   adicionarGenero(form: FormControl) {
     this.generoService.adicionar(this.genero)
      .then(() => {
        this.genero = new Genero();
         this.consultar();
         this.toasty.success('Cadastrado realizado com sucesso!');

      })
      .catch(erro => this.errorHandler.handle(erro));

   }


     carregarFamilia() {
     return this.familiaService.listarTodasFamiliaDropdown()
     .then( cadastrofamilia => {
        this.cadastrofamilia = cadastrofamilia.map(e => ({label: e.cdFamilia + " - " + e.nmFamilia, value: e.cdFamilia}));
      })
     .catch(erro => this.errorHandler.handle(erro));
     }



     salvar(form: FormControl) {
      if ( this.editando) {
        this.confirmarAlterar(form);
      } else {
        this.adicionarGenero(form);
      }

    }


    atualizar(form: FormControl) {
      this.generoService.atualizar(this.genero)
       .then(listagenero => {
         this.genero = listagenero;
         this.toasty.success('Atualização realizada com sucesso!');
         this.consultar();
         this.router.navigate(['/cadastro-genero']);
       })
       .catch(erro => this.errorHandler.handle(erro));
    }
         //confirmação para alterar
         confirmarAlterar(genero: any) {
          this.confirmation.confirm({
            message: 'Tem certeza que deseja alterar?',
             accept: () => {
               this.atualizar(genero);
             }
          });
         }

    //Carregar Valores
    CarregarGenero(codigo: number) {
      this.generoService.buscarPeloCodigoGenero(codigo)
      .then(listaGenero => {
        this.genero = listaGenero;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));

        }


  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Gênero: ${this.genero.nmGenero}`)

  }

     refresh(): void {
       window.location.reload();
       }

 }
