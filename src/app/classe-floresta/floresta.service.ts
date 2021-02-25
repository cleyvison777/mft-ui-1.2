import { ClasseFloresta } from './../core/model';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Injectable } from '@angular/core';


export class ClasseFlorestaFiltro {
  nmClassefloresta: string;
  page = 0;
  size = 10;
}
@Injectable({
  providedIn: 'root'
})
export class FlorestaService {

  urlClasseFloresta ='http://localhost:8082/icclasefloresta';
  constructor( private http: Http) { }

  pesquisar2(cdEmpresa: any): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      params.set('cdEmpresa', cdEmpresa);
        return this.http.get(`${this.urlClasseFloresta}?cdEmpresa=${cdEmpresa}`, { headers})
        .toPromise()
        .then(response => response.json().content)


  };

  pesquisarImagem(): Promise<any> {
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
        return this.http.get(`${this.urlClasseFloresta}`, { headers})
        .toPromise()
        .then(response => response.json().content)


  };


  pesquisarImagem2(cdClassefloresta: any): Promise<any> {
    const headers = new Headers();
    const params = new URLSearchParams;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.urlClasseFloresta}?cdClassefloresta=${cdClassefloresta}`)
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


  adicionar(classeFloresta: ClasseFloresta) {
    const params = new URLSearchParams;
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
        return this.http.post(`${this.urlClasseFloresta}`, JSON.stringify
        (classeFloresta), {headers})
        .toPromise()
        .then(response => response.json());

 }

  urlUploadAnexo(classeFloresta: ClasseFloresta): string {
    return `${this.urlClasseFloresta}/anexarimagem?cdClassefloresta=${classeFloresta.cdClassefloresta}`
  }

   pesquisar(filtro: ClasseFlorestaFiltro): Promise<any> {
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    params.set('page', filtro.page.toString());
    params.set('size', filtro.size.toString());

    if(filtro.nmClassefloresta) {
      params.set('nmClassefloresta', filtro.nmClassefloresta)
    }

       return this.http.get(`${this.urlClasseFloresta}`, {headers, search: filtro})
        .toPromise()
         .then(response => {
           const responseJson = response.json();
          const classeFloresta = responseJson.content;

          const resultado = {
            classeFloresta,
             total: responseJson.totalElements
          };
           return resultado;

         });

   }
   excluir(cdClassefloresta: number): Promise<void>{
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      return this.http.delete(`${this.urlClasseFloresta}/${cdClassefloresta}`, {headers})
       .toPromise()
       .then(() => null);
   }

   atualizar(classeFloresta: ClasseFloresta){
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
      return this.http.put(`${this.urlClasseFloresta}/${classeFloresta.cdClassefloresta}`,
      JSON.stringify(classeFloresta), {headers})
       .toPromise()
        .then(response => {
          const classeFlorestaAltera = response.json() as ClasseFloresta;
           return classeFlorestaAltera;
        });

   }

   buscarPeloCodigo(cdClassefloresta: number): Promise<ClasseFloresta> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
       return this.http.get(`${this.urlClasseFloresta}/${cdClassefloresta}`, {headers})
        .toPromise()
         .then(response => {
              const classeFloresta = response.json() as ClasseFloresta;

              return classeFloresta;
            });

   }



}
