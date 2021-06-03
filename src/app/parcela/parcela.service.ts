import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { CadParcela } from '../core/model';

export class parcelaFiltro {
  cdEmpresa: any;
  page = 0;
  size = 10;
}
@Injectable({
  providedIn: 'root'
})
export class ParcelaService {
parcelaURL = 'http://localhost:8082/cadparcela'

  constructor(private http: Http) { }

  pesquisar2(cdEmpresa: any): Promise<any>{
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
     params.set('cdEmpresa', cdEmpresa);

     return this.http.get(`${this.parcelaURL}?cdEmpresa=${cdEmpresa}`, { headers})
     .toPromise()
      .then(response => {
        const responseJson = response.json();
        const parcelas = responseJson.content;

        const resultado = {
          parcelas,
           total: responseJson.totalElements
        };
        return resultado
      });
  }

  pesquisar(filtro: parcelaFiltro): Promise<any> {
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('page', filtro.page.toString());
    params.set('size', filtro.size.toString());
       return this.http.get(`${this.parcelaURL}`, {headers, search: filtro})
        .toPromise()
         .then(response => {
           const responseJson = response.json();
           const parcelas = responseJson.content;
              const resultado = {
                   parcelas,
                   total: responseJson.totalElements
              }
              return resultado;
         });

  }

  adicionar(cadparcela: CadParcela): Promise<CadParcela> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
      return this.http.post(this.parcelaURL, JSON.stringify(cadparcela), {headers})
       .toPromise()
         .then(response => response.json())
  }

   excluir(cdParcela: number): Promise<void> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      return this.http.delete(`${this.parcelaURL}/${cdParcela}`, {headers})
        .toPromise()
          .then(() => null);
   }

   atualizar(cadparcela: CadParcela): Promise<CadParcela> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.parcelaURL}/${cadparcela.cdParcela}`,
    JSON.stringify(cadparcela), {headers})
       .toPromise()
         .then(response => {
           const parcelaAlterar = response.json() as CadParcela;
            return parcelaAlterar;
         });
   }

   buscarPeloCodigo(cdParcela: number) {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
       return this.http.get(`${this.parcelaURL}/${cdParcela}`, {headers})
        .toPromise()
          .then(response => {
            const parcelas = response.json() as CadParcela;
             return parcelas;
          });
   }

   listarTodasPrcelas(): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

       return this.http.get(this.parcelaURL, {headers})
         .toPromise()
          .then(response => response.json().content)

   }
}
