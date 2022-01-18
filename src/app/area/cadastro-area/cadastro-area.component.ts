import { MenuItem } from 'primeng/api';
import { MenuService } from './../../core/menu/menu.service';
import { ConfirmationService} from 'primeng/components/common/api';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecieService } from './../../lista-especie/especie.service';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { AreaService } from './../area.service';
import { CadAmf, MenuEmpresa } from './../../core/model';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { EmpresaService } from './../../empresa/empresa.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EquacaoService } from 'src/app/equacao/equacao.service';

@Component({
  selector: 'app-cadastro-area',
  templateUrl: './cadastro-area.component.html',
  styleUrls: ['./cadastro-area.component.css']
})
export class CadastroAreaComponent implements OnInit {

  empresas =[];
  especies = [];
  area = [];
  cdEmp: any;
  equacao = [];
  cadAmf = new CadAmf();
  empresaSelecionada = new MenuEmpresa();
  displayBasic: boolean;
  items: MenuItem[];
  activeItem: MenuItem;
  salvarEmAndamento: boolean = false;


  constructor(
    private errorHandler :ErrorHandlerService,
    private toasty: ToastyService,
    private listaEspecieService: EspecieService,
    private equacaoService: EquacaoService,
    private menuService: MenuService,
    private areaService: AreaService,
    private empresaService: EmpresaService,
    private title: Title,
    private route: ActivatedRoute,
    private confirmation: ConfirmationService,
    private router: Router,

    ) { }



  ngOnInit() {
    this.carregarListaEpecie();
    this.cadAmf.lgMudaContada = false;
    this.cadAmf.lgPalmeiraContada = false;
    this.carregarEmpresaSelecionadaArea();
    // falta implementar o cadEquacao no back-end this.carregarEquacao();

     this.items = [
      {label: 'Área de Manejo', icon: 'fa-calendar', routerLink: '/area/cadastro-area'},
       {label: 'Parcela', routerLink: '/parcela/cadastro'},
       {label: 'SubParcela', routerLink: '/subparcela/cadastro'}
     ];

      const codigoAmf = this.route.snapshot.params['codigo'];

      if (codigoAmf) {
        this.carregarAmf(codigoAmf);

    }

    this.title.setTitle('Área de Manejo Florestal-AMF')

  }

  get editando() {
    return Boolean(this.cadAmf.cdarea);
  }

  ////chamar o dialog
  showBasicDialog() {
    this.displayBasic = true;
}

      adicionarArea(form: FormControl){
        this.areaService.adicionar(this.cadAmf)
        .then(() => {
          this.toasty.success('Cadastrado realizado com sucesso!');
          this.salvarEmAndamento = true;
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

      carregarListaEpecie() {
        return this.listaEspecieService.listarTodasEspecie()
        .then( especies => {
          this.especies = especies.map(e => ({label: e.cdListaEsp + " - " + e.nmListaEsp, value: e.cdListaEsp}));
        })
      }
      carregarEquacao() {
        return this.equacaoService.listarTodasEquacao()
         .then( equacao => {
            this.equacao = equacao.map(e => ({label: e.cdEquacao + " - " + e.nmEquacao, value: e.cdEquacao}))
         })
         .catch(erro => this.errorHandler.handle(erro));
      }



        //Metodo para carregar valores
      carregarAmf(codigo: number) {
        this.areaService.buscarPeloCodigo(codigo)
        .then(amf => {
        this.cadAmf = amf;
        this.atualizarTituloEdicao();
        })
      .catch(erro => this.errorHandler.handle(erro));
      }


      atualizarAmf(form: FormControl) {
        this.areaService.atualizar(this.cadAmf)
        .then(amf => {
          this.cadAmf = amf;
          this.toasty.success('Atualização realizada com sucesso!');
          //REDIRECIONA PARA O ADICIONAR O AMF
          this.router.navigate(['/area/cadastro-area']);

        })
        .catch(erro => this.errorHandler.handle(erro));
      }
      //confirmação para alterar
      confirmarAlterar(amf: any) {
        this.confirmation.confirm( {
          message: 'Tem certeza que deseja alterar?',
          accept: () => {
            this.atualizarAmf(amf);
          }
        });
      }


      salvar(form: FormControl) {
        if (this.editando) {
          this.confirmarAlterar(form);
        } else {
      this.adicionarArea(form);
        }

     }
     atualizarTituloEdicao(){
      this.title.setTitle(`Edição Família: ${this.cadAmf.nmArea}`)

    }

      refresh(): void {
        window.location.reload();
        }

        pesquisar2(cdEmpresa) {
          this.areaService.pesquisar2(cdEmpresa)
            .then(empresaSelecionada =>  this.area  = empresaSelecionada);
        }

        carregarEmpresaSelecionadaArea(){
          return this.menuService.carregarEmpresaSelecionada()
           .then(empresaSelecionada => {
             this.empresaSelecionada.cdEmpresa = empresaSelecionada;
             this.pesquisar2(this.empresaSelecionada.cdEmpresa);
             this.cadAmf.cdEmpresa.cdEmpresa = this.empresaSelecionada.cdEmpresa

           })
           .catch(erro => this.errorHandler.handle(erro));
        }

}
