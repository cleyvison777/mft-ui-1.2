import { Headers, Http, URLSearchParams  } from '@angular/http';
import { Injectable } from '@angular/core';

export class CadAreaFiltro{
  nmArea: string;
  page = 0;
  size = 2;

}

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  cadAreaUrl = 'http://localhost:8082/cadamf';

    constructor( private http: Http) { }


    pequisar(filtro: CadAreaFiltro): Promise<any> {
      const params = new URLSearchParams;
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      //Filtra a consulta(filtro: CadeAmfFiltro) atravez 'nmArea'
      params.set('page', filtro.page.toString());
      params.set('size', filtro.size.toString());

     if(filtro.nmArea) {
       params.set('nmArea', filtro.nmArea)
     }

     return this.http.get(`${this.cadAreaUrl}`, { headers, search: filtro })
      .toPromise()
      .then(response => {
          const responseJson = response.json();
          const cadarea = responseJson.content;

          const resultado = {
             cadarea,
             total: responseJson.totalElements
          };
          return resultado;
        });

    }

    excluir(cdarea: number): Promise<void> {
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      return this.http.delete(`${this.cadAreaUrl}/${cdarea}`, { headers })
      .toPromise()
      .then(() => null);
    }

}
