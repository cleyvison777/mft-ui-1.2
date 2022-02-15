import { InvContCIF} from './../core/model';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
export class CifFiltro {
  nmCif:string;
  cdEmpresa: number;
  page = 0;
  size = 15;
}


@Injectable({
  providedIn: 'root'
})
export class CifService {

  cifUrl = 'http://localhost:8082/cif';

  constructor(private http: Http) { }

  pesquisar2(cdEmpresa: any): Promise<any> {
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('cdEmpresa', cdEmpresa);
      return this.http.get(`${this.cifUrl}?cdEmpresa=${cdEmpresa}`, {headers})
       .toPromise()
        .then(response =>
          response.json().content);
  }

  consulta(filtro: CifFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      if(filtro.nmCif) {
        params.set('nmCif',filtro.nmCif)
      }
      return this.http.get(`${this.cifUrl}`,
      {headers, search: filtro})
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const cif = responseJson.content;
          const resultado = {
              cif,
               total: responseJson.totalElements
          }
          return resultado;
      });
  }

  buscarPeloTs(cdClasseTamanho: any): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    return this.http.get(`${this.cifUrl}?cdEmpresa=${1}&cdClasseTamanho=${cdClasseTamanho}`)
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const listaTs = responseJson.content;
        const resultado = {
          listaTs,
          total: responseJson.totalElements
        };
        return resultado;

      });

  }

    adiconar(invContCIF: InvContCIF): Promise<any> {
      const headers = new Headers();
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');
        return this.http.post(this.cifUrl,
          JSON.stringify(invContCIF), {headers})
          .toPromise()
            .then(response => response.json())
    }

    excluir(cdCif: InvContCIF): Promise <any> {
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
         return this.http.delete(`${this.cifUrl}/${cdCif}`, {headers})
          .toPromise()
           .then(() => null)
    }

    atualizar(invContCIF: InvContCIF): Promise<any> {
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');
        return this.http.put(`${this.cifUrl}/${invContCIF.cdCif}`,
         JSON.stringify(invContCIF), {headers})
         .toPromise()
         .then(response =>{
           const invContCIFAltera = response.json() as InvContCIF;
           return invContCIFAltera;
         })
    }

    buscarPeloCodigoCif(cdCif: number): Promise<InvContCIF> {
      const headers = new Headers();
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
       return this.http.get(`${this.cifUrl}/${cdCif}`, {headers})
        .toPromise()
          .then(response => {
            const cif = response.json() as InvContCIF;
            return cif;
          })
    }

    listarTodasCif() {
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');
      return this.http.get(`${this.cifUrl}`, {headers})
      .toPromise()
      .then(response => response.json().content);
    }





}
