import { SelectItem } from 'primeng/components/common/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  selecao:any = [
    {label: 'Comercial', value:1},
    {label: 'Não Comercial', value: 2}
  ];




  constructor() {

   }

  ngOnInit() {
   this.selecao =1

  }

}
