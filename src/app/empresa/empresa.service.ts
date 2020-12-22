import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';


export class CadempresaFiltro {
  nmEmpresa: string;
  page = 0;
  size = 10;
}


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  cadempresaurl = 'http://localhost:8082/cadempresa';

  constructor( private http: Http) { }



   pesquisar(filtro: CadempresaFiltro): Promise<any> {
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');


    return this.http.get(`${this.cadempresaurl}`, { headers})
    .toPromise()
    .then( response => response.json().content)
    }

}
