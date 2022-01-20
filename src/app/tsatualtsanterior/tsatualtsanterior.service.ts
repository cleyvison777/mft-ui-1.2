import { CadTsAtualTsAnterior } from './../core/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TsatualtsanteriorService {

  cadTsAtualTsAnterior = new CadTsAtualTsAnterior();
  CadTsURL = 'http://localhost:8082/cadtsatualtsanterior';


  constructor(private http: Http) { }


  pesquisar2(cdEmpresa: any): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('cdEmpresa', cdEmpresa);

    return this.http.get(`${this.CadTsURL}?cdEmpresa=${cdEmpresa}`, { headers})
    .toPromise()
      .then(response => {
        const responseJson = response.json();
        const listaTs = responseJson.content;

        const resultado = {
          listaTs,
           total: responseJson.totalElements
        };
        return resultado;
      });

  }



  adicionar(cadTsAtualTsAnterior: CadTsAtualTsAnterior): Promise<CadTsAtualTsAnterior> {
    const params = new URLSearchParams;
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.CadTsURL,  JSON.stringify(cadTsAtualTsAnterior),  { headers })
      .toPromise()
      .then(response => response.json());
  }



  buscarPeloTs(cdTratamentotual: any): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    return this.http.get(`${this.CadTsURL}?cdEmpresa=${1}&cdTratamentotual=${cdTratamentotual}`)
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const listaTs = responseJson.content;
        const resultado = {
          listaTs,
          total: responseJson.totalElements
        };
        return resultado;

      });

  }


  excluir(cdTratamentoAnteriorPk: number): Promise<void> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    return this.http.delete(`${this.CadTsURL}/${cdTratamentoAnteriorPk}`, { headers })
     .toPromise()
      .then(() => null);
  }


    atualizar(cadTsAtualTsAnterior: CadTsAtualTsAnterior): Promise<CadTsAtualTsAnterior> {
          const headers = new Headers;
          headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
          headers.append('Content-Type', 'application/json');
      return this.http.put(`${this.CadTsURL}/${cadTsAtualTsAnterior.cdTratamentoAnteriorPk}`,
        JSON.stringify(cadTsAtualTsAnterior), { headers })
        .toPromise()
        .then(response => {
          const cadTsAtualTsAnteriorAltera = response.json() as CadTsAtualTsAnterior;
          return cadTsAtualTsAnteriorAltera;
        });
    }

    buscarPeloTsAtualiza(cdTratamentoAnteriorPk: number): Promise<CadTsAtualTsAnterior> {
      const headers = new Headers();
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      return this.http.get(`${this.CadTsURL}/${cdTratamentoAnteriorPk}`, { headers })
        .toPromise()
        .then(response => {
          const cadTsAtualTsAnterior = response.json() as CadTsAtualTsAnterior;
          return cadTsAtualTsAnterior;
        });
    }


    buscarPeloTsAnterior(cdTratamentotual: number): Promise<CadTsAtualTsAnterior> {
      const headers = new Headers();
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      return this.http.get(`${this.CadTsURL}/?cdTratamentotual=${cdTratamentotual}`, { headers })
        .toPromise()
        .then(response => {
          const cadTsAtualTsAnterior = response.json() as CadTsAtualTsAnterior;
          return cadTsAtualTsAnterior;
        });
    }

    listarTodasTS(): Promise<any>  {
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');
     return  this.http.get(this.CadTsURL,  { headers })
       .toPromise()
       .then(response => response.json().content);
    }

}
