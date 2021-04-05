import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { EmpresaService } from './../../empresa/empresa.service';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { EquacaoService } from './../equacao.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equacao-cadastro',
  templateUrl: './equacao-cadastro.component.html',
  styleUrls: ['./equacao-cadastro.component.css']
})
export class EquacaoCadastroComponent implements OnInit {

  constructor(
    private equacaoService: EquacaoService,
    private toasty: ToastyService,
    private empresaService: EmpresaService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirm: ConfirmationService,
    private location: Location,

  ) { }

  ngOnInit() {

  }




}
