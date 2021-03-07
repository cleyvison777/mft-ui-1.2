import { UsoEspecie } from './../core/model';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Injectable } from '@angular/core';


export class UsoEspecieFiltro {
  nmUso: string;
  cdEmpresa: any;
  page = 0;
  size = 10;
}
@Injectable({
  providedIn: 'root'
})
export class UsoEspecieService {

  cadusoEspecieURL = 'http://localhost:8082/usoespecie';

  constructor(private http: Http) { }


  pesquisar2(cdEmpresa: any): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');


      params.set('cdEmpresa', cdEmpresa);

    return this.http.get(`${this.cadusoEspecieURL}?cdEmpresa=${cdEmpresa}`, { headers})
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

  pesquisarUsoEspecie(filtro: UsoEspecieFiltro): Promise<any> {
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    params.set('page', filtro.page.toString());
    params.set('size', filtro.size.toString());
    params.set('cdEmpresa',filtro.cdEmpresa);

    if(filtro.nmUso) {
      params.set('nmUso', filtro.nmUso);
    }
    return this.http.get(`${this.cadusoEspecieURL}`, {headers, search: filtro})
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


  buscarPeloCodigo(cdUso: number): Promise<UsoEspecie> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
     return this.http.get(`${this.cadusoEspecieURL}/${cdUso}`, { headers })
      .toPromise()
       .then(response => {
         const cadEspecieUso = response.json() as UsoEspecie;
           return cadEspecieUso;
       });
  }

  adicionarUsoEspecie(cadUsoEspecie: UsoEspecie): Promise<UsoEspecie>{
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
     return this.http.post(this.cadusoEspecieURL, JSON.stringify(cadUsoEspecie), { headers })
          .toPromise()
           .then(response => response.json());
  }

  excluirUsoEspecie(cdUso: number): Promise<void> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
     return this.http.delete(`${this.cadusoEspecieURL}/${cdUso}`, { headers })
     .toPromise()
     .then(() => null);
  }

  atualizarUsoespecie(cadusoespecie: UsoEspecie): Promise<UsoEspecie>{
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
     return this.http.put(`${this.cadusoEspecieURL}/${cadusoespecie.cdUso}`,
     JSON.stringify(cadusoespecie), { headers })
     .toPromise()
      .then(response => {
        const usopespecieAltera = response.json() as UsoEspecie;
         return usopespecieAltera;
      });
  }

  buscarPeloCodigoUsoEspecie(cdUso: number): Promise<UsoEspecie>{
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
     return this.http.get(`${this.cadusoEspecieURL}/${cdUso}`, { headers })
       .toPromise()
        .then(response => {
          const cadusoespecie = response.json() as UsoEspecie;
          return cadusoespecie;
        });

  }

  listarEspecieUso(): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

     return this.http.get(this.cadusoEspecieURL, { headers })
      .toPromise()
       .then(response => response.json().content);
  }
}
