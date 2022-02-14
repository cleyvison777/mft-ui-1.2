import { CadClasseDeTamanho } from './../core/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
export class classeTamanhoFiltro {
cdEmpresa: any;
  page = 0;
  size = 10;
}

@Injectable({
  providedIn: 'root'
})
export class ClasseDeTamanhoService {

  classeTamanhoUrl = 'http://localhost:8082/classedetanho';

  constructor(private http: Http) { }

  pesquisar2(cdEmpresa: any): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('cdEmpresa', cdEmpresa);

    return this.http.get(`${this.classeTamanhoUrl}?cdEmpresa=${cdEmpresa}`, { headers})
    .toPromise()
      .then(response => {
        const responseJson = response.json();
        const classedeTamanho = responseJson.content;

        const resultado = {
          classedeTamanho,
           total: responseJson.totalElements
        };
        return resultado;
      });


    }

    pesquisarClasse(filtro: classeTamanhoFiltro): Promise<any>{
      const headers = new Headers();
      const params = new URLSearchParams;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      params.set('page', filtro.page.toString());
      params.set('size', filtro.size.toString());
      params.set('cdEmpresa',filtro.cdEmpresa);
      return this.http.get(`${this.classeTamanhoUrl}`, {headers, search: filtro})
       .toPromise()
        .then(response => {
          const responseJson = response.json();
          const classedeTamanho = responseJson.content;
          const resultado = {
            classedeTamanho,
            total: responseJson.totalElements
          };
          return resultado;
        })

    }

    buscarPeloCodigo(cdClasseTamanho: number) {
      const headers = new Headers();
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
        return this.http.get(`${this.classeTamanhoUrl}/${cdClasseTamanho}`, {headers})
         .toPromise()
          .then(response => {
            const classedeTamanho = response.json() as CadClasseDeTamanho;
            return classedeTamanho;
          });
    }

    adicionar(classedeTamanho: CadClasseDeTamanho): Promise<CadClasseDeTamanho> {
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');
        return this.http.post(this.classeTamanhoUrl, JSON.stringify(classedeTamanho), {headers})
          .toPromise()
           .then(response => response.json());
    }

    excluir(cdClasseTamanho: number): Promise<void>{
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
       return this.http.delete(`${this.classeTamanhoUrl}/${cdClasseTamanho}`, {headers})
         .toPromise()
         .then(() => null);
    }
    atualizar(classedeTamanho: CadClasseDeTamanho): Promise<CadClasseDeTamanho> {
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');
        return this.http.put(`${this.classeTamanhoUrl}/${classedeTamanho.cdClasseTamanho}`,
        JSON.stringify(classedeTamanho), {headers})
         .toPromise()
          .then(response =>{
            const classedeTamanhoAltera = response.json() as CadClasseDeTamanho;
             return classedeTamanhoAltera;
          });
    }

    listaClassedeTamanho(): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
      return this.http.get(this.classeTamanhoUrl, {headers})
       .toPromise()
        .then(response => response.json().content)
    }
}
