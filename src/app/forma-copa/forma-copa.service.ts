import { InvContFormaCopa } from './../core/model';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
export class FormaCopaFiltro {
  nmFormaCopa:string;
  cdEmpresa: number;
  page = 0;
  size = 15;
}
@Injectable({
  providedIn: 'root'
})
export class FormaCopaService {

  copaUrl = 'http://localhost:8082/formacopa';
  constructor(private http:Http) { }

  pesquisar2( cdEmpresa: any): Promise<any>{
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('cdEmpresa', cdEmpresa);
     return this.http.get(`${this.copaUrl}?cdEmpresa=${cdEmpresa}`, {headers})
      .toPromise()
       .then(response =>
        response.json().content)
  }


  consultar(filtro: FormaCopaFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      if(filtro.nmFormaCopa) {
        params.set('nmFormaCopa', filtro.nmFormaCopa);
      }

      return this.http.get(`${this.copaUrl}`,
       {headers, search: filtro})
        .toPromise()
         .then(response =>
          {
            const responseJson = response.json();
            const copa = responseJson.content;

             const resultado = {
              copa,
               total: responseJson.totalElements
             };
             return resultado;
          });
  }


  adicionar(invContFormaCopa: InvContFormaCopa): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
      return this.http.post(this.copaUrl,
        JSON.stringify(invContFormaCopa), {headers})
         .toPromise()
          .then(response => response.json())
  }


  excluir(cdFormaCopa: InvContFormaCopa): Promise <any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      return this.http.delete(`${this.copaUrl}/${cdFormaCopa}`, {headers})
       .toPromise()
        .then(() => null)
  }

  atualizar(invContFormaCopa: InvContFormaCopa): Promise<any> {

    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
         return this.http.put(`${this.copaUrl}/${invContFormaCopa.cdFormaCopa}`,
         JSON.stringify(invContFormaCopa), {headers})
         .toPromise()
          .then(response => {
            const invContFormaCopaAltera = response.json() as InvContFormaCopa;
            return invContFormaCopaAltera
          })

  }

  buscarPeloCodigoFormaCopa(cdFormaCopa: number): Promise<InvContFormaCopa>{
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    return this.http.get(`${this.copaUrl}/${cdFormaCopa}`, {headers})
     .toPromise()
     .then(response => {
      const copa = response.json() as InvContFormaCopa;
      return copa;
    });
  }


  listarTodasConsultar(){
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
      return this.http.get(`${this.copaUrl}`, {headers})
      .toPromise()
      .then(response => response.json().content);
  }


}
