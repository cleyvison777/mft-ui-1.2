import { Headers, Http, URLSearchParams  } from '@angular/http';
import { Injectable } from '@angular/core';




//metodo para fazer pesquisa sem paginação
// export interface CadempresaFiltro {
//   nmEmpresa: string;
// }
//////////////////////////////
export class CadempresaFiltro {
  nmEmpresa: string;
  page = 0;
  size = 2;
}


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  cadempresaurl = 'http://localhost:8082/cadempresa';

  constructor( private http: Http) { }
//metodo para fazer pesquisa sem paginação
  // pesquisar(filtro: CadempresaFiltro): Promise<any> {
  //   const params = new URLSearchParams;
  //   const headers = new Headers;
  //   headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
  //       //Filtra a consulta(filtro: CadeAmfFiltro) atravez 'nmArea'
  //   if (filtro.nmEmpresa){
  //     params.set('nmEmpresa', filtro.nmEmpresa)
  //   }

  //   return this.http.get(`${this.cadempresaurl}`, { headers, search: params})
  //   .toPromise()
  //   .then( response => response.json().content)
  //   }
//////////////////////////////////////////////////////////


   pesquisar(filtro: CadempresaFiltro): Promise<any> {
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
        //Filtra a consulta(filtro: CadeAmfFiltro) atravez 'nmArea'
        params.set('page', filtro.page.toString());
        params.set('size', filtro.size.toString());

    if (filtro.nmEmpresa){
      params.set('nmEmpresa', filtro.nmEmpresa)
    }

    return this.http.get(`${this.cadempresaurl}`, { headers, search: filtro})
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const cadempresa = responseJson.content;

      const resultado = {
        cadempresa,
        total: responseJson.totalElements
      };
      return resultado;
       });

    }


}
