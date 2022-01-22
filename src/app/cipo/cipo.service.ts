import { InvContCipo } from './../core/model';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
export class CipoFiltro {
  nmCipo: string;
  cdEmpresa: number;
  page = 0;
  size = 15;
}
@Injectable({
  providedIn: 'root'
})
export class CipoService {

  cipoUrl = 'http://localhost:8082/cipo';

  constructor(private http: Http) { }

  pesquisar2(cdEmpresa: any): Promise<any> {
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
     return this.http.get(`${this.cipoUrl}?cdEmpresa=${cdEmpresa}`, {headers})
      .toPromise()
        .then(response =>
          response.json().content)
  }

  consultar(filtro: CipoFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      if(filtro.nmCipo) {
          params.set('nmCipo', filtro.nmCipo);
      }

      return this.http.get(`${this.cipoUrl}`,
        {headers, search: filtro})
         .toPromise()
          .then(response => {
            const responseJson = response.json();
            const cipo =  responseJson.content;

             const resultado ={
              cipo,
              total: responseJson.totalElements
             }
             return resultado;
          });
     }

       adicionar(invContCipo: InvContCipo): Promise<any> {
        const headers = new Headers();
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
        headers.append('Content-Type', 'application/json');
          return this.http.post(this.cipoUrl,
            JSON.stringify(invContCipo), {headers})
             .toPromise()
               .then(response => response.json())
       }

       excluir(cdCipo: InvContCipo): Promise<any> {
        const headers = new Headers;
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
          return this.http.delete(`${this.cipoUrl}/${cdCipo}`, {headers})
           .toPromise()
             .then(() => null)
       }

       atualizar(invContCipo: InvContCipo): Promise<any> {
        const headers = new Headers;
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
        headers.append('Content-Type', 'application/json');
          return this.http.put(`${this.cipoUrl}/${invContCipo.cdCipo}`,
          JSON.stringify(invContCipo), {headers})
           .toPromise()
             .then(response => {
               const invContCipoAltera = response.json() as InvContCipo;
               return invContCipoAltera
             });
       }

       buscarPeloCodigoCipo(cdCipo: number): Promise <InvContCipo> {
        const headers = new Headers();
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
            return this.http.get(`${this.cipoUrl}/${cdCipo}`, {headers})
             .toPromise()
             .then(response =>{
               const cipo = response.json() as InvContCipo;
               return cipo;
             })
       }

       lsitarTodasInvCipo() {
        const headers = new Headers;
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
        headers.append('Content-Type', 'application/json');
        return this.http.get(`${this.cipoUrl}`, {headers})
         .toPromise()
          .then(response => response.json().content)
       }


}
