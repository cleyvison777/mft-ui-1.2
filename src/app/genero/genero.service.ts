import { Genero } from './../core/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';


export class GeneroFiltro {
  nmGenero: string;
  page = 0;
  size = 15;
}

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

generoURL = 'http://localhost:8082/genero';

  constructor(private http: Http) { }


  consultar(filtro: GeneroFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('page', filtro.page.toString());
    params.set('size', filtro.size.toString());
     if (filtro.nmGenero) {
       params.set('nmGenero', filtro.nmGenero);
     }
     return this.http.get(`${this.generoURL}`,
     { headers, search: filtro })
     .toPromise()
     .then(response => {
       const responseJson = response.json();
       const listaGenero = responseJson.content;

       const resultado = {
         listaGenero,
         total: responseJson.totalElements
       };
       return resultado;
     });
   }

   adicionar(genero: Genero): Promise<Genero> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
        return this.http.post(this.generoURL,
          JSON.stringify(genero), { headers })
           .toPromise()
            .then(response => response.json());
     }

      //exclui o resgitro da tabela
      excluir(cdGenero: number): Promise<void> {
        const headers = new Headers;
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
        return this.http.delete(`${this.generoURL}/${cdGenero}`, { headers })
        .toPromise()
        .then(() => null);
      }


      atualizar(genero: Genero): Promise<Genero> {
        const headers = new Headers;
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
        headers.append('Content-Type', 'application/json');
         return this.http.put(`${this.generoURL}/${genero.cdGenero}`,
          JSON.stringify(genero), { headers })
           .toPromise()
           .then(response => {
             const generoAltera = response.json() as Genero;
                return generoAltera;
    });

   }

        buscarPeloCodigoGenero(cdGenero: number): Promise<Genero>{
          const headers = new Headers();
          headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
          return this.http.get(`${this.generoURL}/${cdGenero}`, { headers })
          .toPromise()
            .then(response => {
              const genero = response.json() as Genero;
              return genero;
            });
          }


     //buscar pelo godigo para atualizar
     listarTodosGeneros(): Promise<any> {
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');

        return this.http.get(this.generoURL, { headers })
        .toPromise()
        .then(response => response.json().content);
     }


}

