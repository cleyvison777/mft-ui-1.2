import { MenuEmpresa } from './../model';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuempresa = 'http://localhost:8082/menuempresa';

  constructor(private http: Http) { }

  adicionar(id: MenuEmpresa): Promise<MenuEmpresa> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.menuempresa, JSON.stringify(id), { headers })
      .toPromise()
      .then(response => response.json());
  }

  carregarEmpresaSelecionada(){
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.menuempresa}/empresaselecionada`, { headers })
    .toPromise()
      .then(response => response.json());
  }
  carregarEmpresaSelecionadaNome(): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

     return this.http.get(`${this.menuempresa}/empresaselecionadanome`, { headers })
      .toPromise()
       .then(response => response.text());
  }

}
