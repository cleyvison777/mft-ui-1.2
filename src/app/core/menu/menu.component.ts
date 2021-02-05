import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from './../error-handler.service';
import { MenuService } from './menu.service';
import { EmpresaService } from './../../empresa/empresa.service';
import { EmpresaSelecionadaExibicao, MenuEmpresa, empresaSelecionada } from './../model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  constructor(
  ) { }




  ngOnInit() {

  }




}

