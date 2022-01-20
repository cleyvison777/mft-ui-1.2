import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
export class PodricaoFiltro {
  nmPodridao: string;
  cdEmpresa: number;
  page = 0;
  size = 15;
}
@Injectable({
  providedIn: 'root'
})
export class ProdricaoService {

  prodricaoUrl ='http://localhost:8082/prodridao'
  constructor(private http: Http) { }

  pesquisar2(cdEmpresa: any): Promise<any> {
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('cdEmpresa', cdEmpresa);
       return this.http.get(`${this.prodricaoUrl}?cdEmpresa=${cdEmpresa}`, {headers})
        .toPromise()
         .then(response =>
           response.json().content)
  }

  consultar(filtro: PodricaoFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      if(filtro.nmPodridao) {
          params.set('nmPodridao', filtro.nmPodridao)
      }

      return this.http.get(`${this.prodricaoUrl}`,
      {headers, search: filtro})
      .toPromise()
       .then(response => {
        const responseJson = response.json();
        const podricao = responseJson.content;

        const resultado = {
          podricao,
          total: responseJson.totalElements
        };
        return resultado;

       })

  }
}
