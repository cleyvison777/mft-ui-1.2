import { GeraParcelESubParcela } from './../core/model';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

export class gerarParcelaFiltro {
  cdempresa: any;
}

@Injectable({
  providedIn: 'root'
})
export class GeracaoParSubService {
  geracaoURL = 'http://localhost:8082/geraparcelaesubparcelas';

  constructor(private http: Http) { }



  pesquisar2 (cdEmpresa: any): Promise<any> {
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      params.set('cdEmpresa', cdEmpresa);
         return this.http.get(`${this.geracaoURL}?cdEmpresa=${cdEmpresa}`, {headers})
           .toPromise()
             .then(response => response.json().content);

  }

   //adiciona registros na tabela
  adicionar(geraParcelESubParcela: GeraParcelESubParcela){
    const params = new URLSearchParams;
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
      return this.http.post(this.geracaoURL,
        JSON.stringify(geraParcelESubParcela), {headers})
         .toPromise()
          .then(response => response.json())
  }
}
