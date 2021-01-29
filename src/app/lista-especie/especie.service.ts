import { Http, Headers } from '@angular/http';
import { CadListaEspecie } from './../core/model';
import { Injectable } from '@angular/core';
export class ListaEspecieFiltro{
  nmListaEsp: string;
  page = 0;
  size = 10;
}

@Injectable({
  providedIn: 'root'
})


export class EspecieService {

  CadListaEspecieURL = 'http://localhost:8082/cadlistaespecie';


  constructor( private http: Http) { }


  pesquisarListaEspecie(filtro: ListaEspecieFiltro): Promise<any>{
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('page', filtro.page.toString());
    params.set('size', filtro.size.toString());
      if(filtro.nmListaEsp) {
        params.set('nmListaEsp', filtro.nmListaEsp);
      }
      return this.http.get(`${this.CadListaEspecieURL}`, {headers, search: filtro})
       .toPromise()
        .then(response => {
          const responseJason = response.json();
          const listaespecie = responseJason.content;

          const resultado = {
            listaespecie,
            total: responseJason.totalElements
          };
           return resultado;
        });

   }

   listarTodasEspecie(): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.get(this. CadListaEspecieURL, { headers })
    .toPromise()
    .then(response => response.json().content);
    }


     adicionarListaEspecie(cadListaEspecie: CadListaEspecie): Promise<CadListaEspecie>{
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');
        return this.http.post(this.CadListaEspecieURL, JSON.stringify(cadListaEspecie), {headers})
         .toPromise()
          .then(response => response.json());
     }


     excluirListaEspecie(cdListaEsp: number): Promise<void> {
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      return this.http.delete(`${this.CadListaEspecieURL}/${cdListaEsp}`, { headers })
       .toPromise()
        .then(() => null);
    }
    atualizarListaEspecie(listaespecie: CadListaEspecie): Promise<CadListaEspecie>{
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');

       return this.http.put(`${this.CadListaEspecieURL}/${listaespecie.cdListaEsp}`,
       JSON.stringify(listaespecie), { headers })
        .toPromise()
         .then(response => {
           const listaespecieAltera = response.json() as CadListaEspecie;
            return listaespecieAltera;
         });
    }
    listarListaEspecie(): Promise<any> {
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');
      return this.http.get(this.CadListaEspecieURL, {headers})
       .toPromise()
        .then(response => response.json().content);
    }

    buscarPeloCodigoListaEspecie(cdListaEsp: number): Promise<CadListaEspecie> {
      const headers = new Headers();
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      return this.http.get(`${this.CadListaEspecieURL}/${cdListaEsp}`, { headers })
       .toPromise()
        .then(response => {
          const listaespecie = response.json() as CadListaEspecie;
           return listaespecie;
        });
     }

}
