import { MenuService } from 'src/app/core/menu/menu.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { TsatualtsanteriorService } from './../../tsatualtsanterior/tsatualtsanterior.service';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { ClasseTamanhoService  as ClasseTamanhoIndividuoService} from './../../classe-tamanho-individuo/classe-tamanho.service';

@Component({
  selector: 'app-cadastro-cif',
  templateUrl: './cadastro-cif.component.html',
  styleUrls: ['./cadastro-cif.component.css']
})
export class CadastroCifComponent implements OnInit {
  classeInd = [];



  constructor(
    private classeTamanhoIndividuoService: ClasseTamanhoIndividuoService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private menuService: MenuService,
    private tsService: TsatualtsanteriorService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit( ) {
  this.carregarClasseIndv();
  }


  carregarClasseIndv(){
    return this.classeTamanhoIndividuoService.listarTodasClasseIndividuo()
     .then( classeInd =>{
       this.classeInd = classeInd.map(e => ({label: e.cdClasseTamanho + " - " + e.nmClasseTamanho, value: e.cdClasseTamanho}))
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

}
