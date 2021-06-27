import { CadSubParcela } from './../core/model';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';


export class subParcelaFiltro {
  cdEmpresa: any;
  page = 0;
  size = 10;
}
@Injectable({
  providedIn: 'root'
})
export class SubparcelaService {
  subParcelaURL = 'http://localhost:8082/cadsubparcela'

  constructor(private http: Http) { }

  // pesquisar2(cdEmpresa: any): Promise<any> {
  //   const params = new URLSearchParams;
  //   const headers = new Headers;
  //   headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
  //   params.set('cdEmpresa', cdEmpresa);

  //   return this.http.get(`${this.subParcelaURL}?cdEmpresa=${cdEmpresa}`, {headers})
  //    .toPromise()
  //      .then(response => {
  //        const responseJson = response.json();
  //        const cadsubparcela = responseJson.content;

  //        const resultado = {
  //         cadsubparcela,
  //          total: responseJson.totalElements
  //        };
  //        return resultado;
  //      })
  // }

  pesquisar(filtro: subParcelaFiltro): Promise<any>{
     const params = new URLSearchParams;
     const headers = new Headers;
     headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

     params.set('page', filtro.page.toString());
     params.set('size', filtro.size.toString());

     return this.http.get(`${this.subParcelaURL}`, {headers, search: filtro})
      .toPromise()
       .then(response => {
         const responseJson = response.json();
         const cadsubparcela = responseJson.content;

          const resultado = {
            cadsubparcela,
            total: responseJson.totalElements
          }
          return resultado;
       });

  }

  adicionar(cadSubParcela: CadSubParcela): Promise<CadSubParcela> {
      const headers = new Headers();
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');
      return this.http.post(this.subParcelaURL, JSON.stringify(cadSubParcela), { headers})
       .toPromise()
         .then(response => response.json());
  }
}
