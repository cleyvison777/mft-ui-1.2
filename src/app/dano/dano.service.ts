import { InvContDano } from './../core/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';


export class DanoFiltro {
  nmDano: string;
  page = 0;
  size = 15;
}
@Injectable({
  providedIn: 'root'
})
export class DanoService {


  danoUrl = 'http://localhost:8082/danos';

  constructor(private http: Http) { }


  consulta(filtro: DanoFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('page', filtro.page.toString());
    params.set('size', filtro.size.toString());

     if(filtro.nmDano){
       params.set('nmDano', filtro.nmDano);
     }
      return this.http.get(`${this.danoUrl}`,
      {headers, search: filtro})
      .toPromise()
       .then(response => {
        const responseJson = response.json();
        const invContDano = responseJson.content;

        const resultado = {
          invContDano,
          total: responseJson.totalElements
        };
        return resultado;
       })
  }


  adicionar(invContDano: InvContDano): Promise<any>  {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.danoUrl,
      JSON.stringify(invContDano), {headers})
       .toPromise()
        .then(response => response.json());
  }

  excluir(cdDano: InvContDano): Promise<any> {

    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      return this.http.delete(`${this.danoUrl}/${cdDano}`, {headers})
      .toPromise()
      .then(() => null)

  }

  atualizar(invContDano: InvContDano): Promise<any> {

    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.danoUrl}/${invContDano.cdDano}`,
    JSON.stringify(invContDano), {headers})
     .toPromise()
      .then(response => {
        const invContDanoAltera = response.json() as InvContDano;
         return invContDanoAltera;
      })


  }

  buscarPeloCodigoInvContDano(cdDano: number): Promise<InvContDano>{
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    return this.http.get(`${this.danoUrl}/${cdDano}`, {headers})
     .toPromise()
    .then(response => {
      const invContDano = response.json() as InvContDano;
      return invContDano;
    });
  }

  listarTodasInvContDano(){
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
      return this.http.get(`${this.danoUrl}`, {headers})
      .toPromise()
      .then(response => response.json().content);
  }

}
