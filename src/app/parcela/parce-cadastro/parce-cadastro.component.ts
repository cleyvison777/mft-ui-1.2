import { TipoParcelaService } from './../../tipo-parcela/tipo-parcela.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AreaService } from './../../area/area.service';
import { MenuService } from 'src/app/core/menu/menu.service';
import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ParcelaService } from '../parcela.service';

@Component({
  selector: 'app-parce-cadastro',
  templateUrl: './parce-cadastro.component.html',
  styleUrls: ['./parce-cadastro.component.css']
})
export class ParceCadastroComponent implements OnInit {

  items: MenuItem[];
  listaTipoparcela = [];
  parcelas = [];

  activeItem: MenuItem;
  constructor(

    private menuService: MenuService,
    private areaService: AreaService,
    private parcelaService: ParcelaService,
    private tipoParcelaService: TipoParcelaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.items = [
      {label: 'Área de Manejo', routerLink:'/area/cadastro-area'},
      {label: 'Parcela', routerLink:'/parcela/cadastro'},
      {label: 'SubParcela', routerLink:'/area/cadastro-area'}
    ];
   this.carregarTipoParcela();
  }

  carregarTipoParcela() {
    return this.tipoParcelaService.listarTodasParcelas()
     .then( listaTipoparcela =>{
       this.listaTipoparcela = listaTipoparcela.map( e => ({label: e.cdTipoParcela + " - "+ e.nmTipoParcela, value: e.cdTipoParcela}))
     })
 }

}
