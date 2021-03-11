import { CadAmf } from './../core/model';
import { Headers, Http, URLSearchParams  } from '@angular/http';
import { Injectable } from '@angular/core';

export class CadAreaFiltro{
  nmArea: string;
  page = 0;
  size = 10;

}

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  cadAreaUrl = 'http://localhost:8082/cadamf';

    constructor( private http: Http) { }


    pesquisar2(cdEmpresa: any): Promise<any> {

      const params = new URLSearchParams;
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
        params.set('cdEmpresa', cdEmpresa);
          return this.http.get(`${this.cadAreaUrl}?cdEmpresa=${cdEmpresa}`, { headers})
          .toPromise()
          .then(response => response.json().content)


    };

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

    //adiciona registros na tabela
    adicionar(cadAmf: CadAmf){
      const params = new URLSearchParams;
      const headers = new Headers();
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');

       return this.http.post(this.cadAreaUrl,
        JSON.stringify(cadAmf), { headers })
         .toPromise()
         .then(response => response.json());
    }


    excluir(cdarea: number): Promise<void> {
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      return this.http.delete(`${this.cadAreaUrl}/${cdarea}`, { headers })
      .toPromise()
      .then(() => null);
    }

    atualizar(cadAmf: CadAmf): Promise<CadAmf> {
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');
       return this.http.put(`${this.cadAreaUrl}/${cadAmf.cdarea}`,
       JSON.stringify(cadAmf), { headers })
       .toPromise()
       .then(response => {
         const cadamfaltera = response.json() as CadAmf;

         return cadamfaltera;
       });
    }

    buscarPeloCodigo(cdarea: number): Promise<CadAmf> {
      const headers = new Headers();
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      return this.http.get(`${this.cadAreaUrl}/${cdarea}`, { headers })
      .toPromise()
      .then(response => {
        const cadAmf = response.json() as CadAmf;

        return cadAmf;
      });
    }


   listarTodasArea(): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.get(this. cadAreaUrl, { headers })
    .toPromise()
    .then(response => response.json().content);
    }

}
