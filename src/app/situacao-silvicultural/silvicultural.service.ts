import { CadTratamentoSilvicultural } from './../core/model';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

export class SilviculturalFiltro {
  page = 0;
  size = 15;
  cdEmpresa: any;
  nmTratamento: string;
}

@Injectable({
  providedIn: 'root'
})
export class SilviculturalService {
  SilviculturalURL = 'http://localhost:8082/cadtratamentosilvicultural';


  constructor(private http: Http) { }

  pesquisar2(cdEmpresa: any): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('cdEmpresa', cdEmpresa);

    return this.http.get(`${this.SilviculturalURL}?cdEmpresa=${cdEmpresa}`, { headers})
    .toPromise()
      .then(response => {
        const responseJson = response.json();
        const cadEspecieUso = responseJson.content;

        const resultado = {
          cadEspecieUso,
           total: responseJson.totalElements
        };
        return resultado;
      });

  }


  consultar(filtro: SilviculturalFiltro): Promise<any> {
    const params = new URLSearchParams;
    const headers = new Headers;
      params.set('page', filtro.page.toString());
      params.set('size', filtro.size.toString());
      params.set('cdEmpresa',filtro.cdEmpresa);
        if (filtro.nmTratamento) {
          params.set('nmTratamento', filtro.nmTratamento);
        }
          return this.http.get(`${this.SilviculturalURL}`, {headers, search: filtro})
           .toPromise()
            .then(response => {
              const responseJson = response.json();
              const listaSilvicultural = responseJson.content;
              const resultado = {
                listaSilvicultural,
                total: responseJson.totalElements
              };
              return resultado;
            });
      }

       adicionar(cadTratamentoSilvicultural: CadTratamentoSilvicultural): Promise<CadTratamentoSilvicultural>{
        const params = new URLSearchParams;
        const headers = new Headers();
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
        headers.append('Content-Type', 'application/json');
          return this.http.post(this.SilviculturalURL, JSON.stringify(cadTratamentoSilvicultural),
          {headers})
           .toPromise()
            .then(response => response.json())
       }

       excluir(cdTratamento: number): Promise<void> {
        const headers = new Headers;
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
           return this.http.delete(`${this.SilviculturalURL}/${cdTratamento}`, {headers})
            .toPromise()
             .then(() => null);
       }

       atualizar(cadTratamentoSilvicultural: CadTratamentoSilvicultural): Promise<CadTratamentoSilvicultural> {
            const headers = new Headers;
            headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
            headers.append('Content-Type', 'application/json');

             return this.http.put(`${this.SilviculturalURL}/${cadTratamentoSilvicultural.cdTratamento}`,
              JSON.stringify(cadTratamentoSilvicultural), {headers})
               .toPromise()
                .then(response => {
                  const cadTratamentoSilvicultural = response.json() as CadTratamentoSilvicultural;
                   return cadTratamentoSilvicultural
                });
        }

            buscarPeloCogigoSilvicultural(cdTratamento: number): Promise<CadTratamentoSilvicultural> {
              const headers = new Headers();
              headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
                return this.http.get(`${this.SilviculturalURL}/${cdTratamento}`, {headers})
                .toPromise()
                  .then(response => {
                    const cadTratamentoSilvicultural = response.json() as CadTratamentoSilvicultural;
                      return cadTratamentoSilvicultural;
                  });
          }

          listarSilvicultural(): Promise<any> {
            const headers = new Headers;
            headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
            headers.append('Content-Type', 'application/json');
              return this.http.get(this.SilviculturalURL, {headers})
              .toPromise()
                .then(response => response.json().content);

          }



}
