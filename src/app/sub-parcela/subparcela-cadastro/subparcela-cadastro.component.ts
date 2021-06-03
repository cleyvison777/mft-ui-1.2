import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subparcela-cadastro',
  templateUrl: './subparcela-cadastro.component.html',
  styleUrls: ['./subparcela-cadastro.component.css']
})
export class SubparcelaCadastroComponent implements OnInit {

  items:MenuItem[];
  activeItem: MenuItem;


  constructor() { }

  ngOnInit() {

    this.items = [
      {label: 'Área de Manejo', icon: 'fa-calendar', routerLink: '/area/cadastro-area'},
       {label: 'Parcela', routerLink: '/parcela/cadastro'},
       {label: 'SubParcela', routerLink: '/subparcela/cadastro'}
     ];

  }


}
