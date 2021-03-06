import { CadCategoriaProtecao } from './../core/model';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Injectable } from '@angular/core';


export class CategoriaFiltro {
  page = 0;
  size = 15;
  nmCategoriaProtecao: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaProtecaoService {
  CategoriaProtecaoURL = 'http://localhost:8082/categoriaProtecao';


  constructor( private http: Http) { }

  pesquisar2(cdEmpresa: any): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      params.set('cdEmpresa', cdEmpresa);
        return this.http.get(`${this.CategoriaProtecaoURL}?cdEmpresa=${cdEmpresa}`, { headers})
        .toPromise()
        .then(response => response.json().content)
  };


  //consultar
  consulta(filtro: CategoriaFiltro): Promise<any>{
    const params = new URLSearchParams;
    const headers = new Headers;
    params.set('page', filtro.page.toString());
    params.set('size', filtro.size.toString());
      if (filtro.nmCategoriaProtecao) {
        params.set('nmCategoriaProtecao', filtro.nmCategoriaProtecao);
      }
      return this.http.get(`${this.CategoriaProtecaoURL}`,
      { headers, search: filtro})
       .toPromise()
       .then(response => {
         const responseJson = response.json();
         const listaCategoriaProtecao = responseJson.content;
         const resultado = {
          listaCategoriaProtecao,
          total: responseJson.totalElements
         };
         return resultado;
       });

   }


   adicionar(cadCategoriaProtecao: CadCategoriaProtecao): Promise<CadCategoriaProtecao> {
    const params = new URLSearchParams;
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
     return this.http.post(this.CategoriaProtecaoURL,
      JSON.stringify(cadCategoriaProtecao),
      { headers })
      .toPromise()
       .then(response => response.json());
   }

   excluir(cdCategoriaProtecao: number): Promise<void> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
     return this.http.delete(`${this.CategoriaProtecaoURL}/${cdCategoriaProtecao}`, { headers })
      .toPromise()
       .then(() => null);
   }


   atualizar(cadCategoriaProtecao: CadCategoriaProtecao): Promise<CadCategoriaProtecao>{
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.CategoriaProtecaoURL}/${cadCategoriaProtecao.cdCategoriaProtecao}`,
    JSON.stringify(cadCategoriaProtecao), { headers })
     .toPromise()
      .then(response => {
        const categoriaProtecaoAltera = response.json() as CadCategoriaProtecao;
         return categoriaProtecaoAltera;
      });

   }

   buscarPeloCodigoCategoria(cdCategoriaProtecao: number): Promise<CadCategoriaProtecao> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
     return this.http.get(`${this.CategoriaProtecaoURL}/${cdCategoriaProtecao}`, { headers })
      .toPromise()
       .then(response => {
         const cadCategoriaProtecao = response.json() as CadCategoriaProtecao;
          return cadCategoriaProtecao;
       });
   }

   listarCategoria(): Promise<any> {
    const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');
       return this.http.get(this.CategoriaProtecaoURL, { headers })
        .toPromise()
         .then(response => response.json().content);
  }

}
