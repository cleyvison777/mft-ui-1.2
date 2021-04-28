import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parce-cadastro',
  templateUrl: './parce-cadastro.component.html',
  styleUrls: ['./parce-cadastro.component.css']
})
export class ParceCadastroComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;
  text2: string;
  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Área de Manejo', routerLink:'/area/cadastro-area'},
      {label: 'Parcela', routerLink:'/parcela/cadastro'},
      {label: 'SubParcela', routerLink:'/area/cadastro-area'}
    ]
  }

}
