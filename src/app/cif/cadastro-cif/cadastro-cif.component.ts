import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-cif',
  templateUrl: './cadastro-cif.component.html',
  styleUrls: ['./cadastro-cif.component.css']
})
export class CadastroCifComponent implements OnInit {

  selecao = [
    {label: ''},
    {label: 'teste1', value: 1},
    {label: 'teste2', value: 2}
  ];
  constructor() { }

  ngOnInit() {
  }

}
