import { CadEquacao } from './../core/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
export class equacaoFiltro {
  nmEquacao: string;
  cdEmpresa: any;
  page = 0;
  size = 10;
}

@Injectable({
  providedIn: 'root'
})
export class EquacaoService {



  equacaoURL = 'http://localhost:8082/equacao'
  constructor(private http: Http) { }


  pesquisar2(cdEmpresa: any): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('cdEmpresa', cdEmpresa);

    return this.http.get(`${this.equacaoURL}?cdEmpresa=${cdEmpresa}`, { headers})
    .toPromise()
      .then(response => {
        const responseJson = response.json();
        const equacoes = responseJson.content;

        const resultado = {
          equacoes,
           total: responseJson.totalElements
        };
        return resultado;
      });


    }

  pesquisar(filtro: equacaoFiltro): Promise<any>{
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('page', filtro.page.toString());
    params.set('size', filtro.size.toString());
      if(filtro.nmEquacao) {
        params.set('nmEquacao', filtro.nmEquacao);
      }
      return this.http.get(`${this.equacaoURL}`, {headers, search: filtro})
       .toPromise()
        .then(response => {
          const responseJason = response.json();
          const equacoes = responseJason.content;

          const resultado = {
            equacoes,
            total: responseJason.totalElements
          };
           return resultado;
        });

   }

      adicionar(cadEquacao: CadEquacao): Promise<CadEquacao> {
        const headers = new Headers;
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
        headers.append('Content-Type', 'application/json');
          return this.http.post(this.equacaoURL, JSON.stringify(cadEquacao), {headers})
            .toPromise()
             .then(response => response.json());
      }

      excluir(cdEquacao: number): Promise<void>{
        const headers = new Headers;
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
         return this.http.delete(`${this.equacaoURL}/${cdEquacao}`, {headers})
           .toPromise()
           .then(() => null);
      }


      atualizar(cadEquacao: CadEquacao): Promise<CadEquacao> {
        const headers = new Headers;
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
        headers.append('Content-Type', 'application/json');
          return this.http.put(`${this.equacaoURL}/${cadEquacao.cdEquacao}`,
          JSON.stringify(cadEquacao), {headers})
           .toPromise()
            .then(response =>{
              const equacaoAltera = response.json() as CadEquacao;
               return equacaoAltera;
            });
      }

      buscarPeloCodigo(cdEquacao: number) {
        const headers = new Headers();
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
          return this.http.get(`${this.equacaoURL}/${cdEquacao}`, {headers})
           .toPromise()
            .then(response => {
              const equacoes = response.json() as CadEquacao;
              return equacoes;
            });
      }


      listarTodasEquacao(): Promise<any> {
        const headers = new Headers;
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
        headers.append('Content-Type', 'application/json');

          return this.http.get(this.equacaoURL, {headers})
           .toPromise()
            .then(response => response.json().content);
      }

}
