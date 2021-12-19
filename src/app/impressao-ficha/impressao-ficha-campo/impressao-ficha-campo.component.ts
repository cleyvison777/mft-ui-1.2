import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MenuService } from 'src/app/core/menu/menu.service';
import { Component, OnInit } from '@angular/core';
import { ClasseTamanhoService  as ClasseTamanhoIndividuoService} from './../../classe-tamanho-individuo/classe-tamanho.service';

@Component({
  selector: 'app-impressao-ficha-campo',
  templateUrl: './impressao-ficha-campo.component.html',
  styleUrls: ['./impressao-ficha-campo.component.css']
})
export class ImpressaoFichaCampoComponent implements OnInit {

  classeInd = [];

  valor = [false, true];

  constructor(
    private classeTamanhoIndividuoService: ClasseTamanhoIndividuoService,
    private menuService: MenuService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title

  ) { }

  ngOnInit() {
  }


  carregarClasseIndv(){
    return this.classeTamanhoIndividuoService.listarTodasClasseIndividuo()
     .then( classeInd =>{
       this.classeInd = classeInd.map(e => ({label: e.cdClasseTamanho + " - " + e.nmClasseTamanho, value: e.cdClasseTamanho}))
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

}
