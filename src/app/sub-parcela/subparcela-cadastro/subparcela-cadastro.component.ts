import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { CadAmf, GeraParcelESubParcela } from 'src/app/core/model';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { MenuService } from 'src/app/core/menu/menu.service';
import { AreaService } from 'src/app/area/area.service';
import { GeracaoParSubService } from 'src/app/geracao-parcela-subparcela/geracao-par-sub.service';
import { TipoParcelaService } from 'src/app/tipo-parcela/tipo-parcela.service';

@Component({
  selector: 'app-subparcela-cadastro',
  templateUrl: './subparcela-cadastro.component.html',
  styleUrls: ['./subparcela-cadastro.component.css']
})
export class SubparcelaCadastroComponent implements OnInit {

  area = [];
  listaTipoparcela = [];
  items:MenuItem[];
  activeItem: MenuItem;
  geracaoDeParcelaESubparcela = new GeraParcelESubParcela();
  cadArea =  new CadAmf();


  constructor(
    private errorHandler :ErrorHandlerService,
    private toasty: ToastyService,
    private menuService: MenuService,
    private areaService: AreaService,
    private geracaoParcelaService: GeracaoParSubService,
    private tipoParcelaService: TipoParcelaService,

  ) { }

  ngOnInit() {
    this.carregarArea();
    this.carregarTipoParcela();

    this.items = [
      {label: 'Área de Manejo', icon: 'fa-calendar', routerLink: '/area/cadastro-area'},
       {label: 'Parcela', routerLink: '/parcela/cadastro'},
       {label: 'SubParcela', routerLink: '/subparcela/cadastro'}
     ];

  }


  carregarArea() {
    return this.areaService.listarTodasArea()
     .then( area =>{
       this.area = area.map(e => ({label: e.cdarea + " - " + e.nmArea, value: e.cdarea}));
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  carregarTipoParcela() {
    return this.tipoParcelaService.listarTodasParcelas()
     .then( listaTipoparcela => {
       this.listaTipoparcela = listaTipoparcela.map( e => ({label: e.cdTipoParcela + " - "+ e.nmTipoParcela, value: e.cdTipoParcela}))
     })
  }




}
