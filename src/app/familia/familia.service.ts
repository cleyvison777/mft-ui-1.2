import { CadFamilia } from './../core/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

export class CadastroFamiliaFiltro {
  nmFamilia: string;
  page = 0;
  size = 15;
}
@Injectable({
  providedIn: 'root'
})
export class FamiliaService {

  cadFamiliaURL = 'http://localhost:8082/cadfamilia';
  //para listar todas os registros no dropdonw
  cadFamiliaURLPageable = 'http://localhost:8082/cadfamilia?page=0&size=120';

  constructor( private http: Http) { }




  pesquisaFamilia(filtro: CadastroFamiliaFiltro): Promise<any>{
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    params.set('page', filtro.page.toString());
    params.set('size', filtro.size.toString());

    if(filtro.nmFamilia){
      params.set('nmFamilia', filtro.nmFamilia)
    }

     return this.http.get(`${this.cadFamiliaURL}`, {headers, search: filtro })
      .toPromise()
       .then(response =>{
        const responseJson = response.json();
        const cadastrofamilia = responseJson.content;

        const resultado = {
          cadastrofamilia,
          total: responseJson.totalElements
        };
        return resultado;
       });
  }

  // pesquisaf(): Promise<any>{
  //   const headers = new Headers;
  //   headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

  //    return this.http.get(`${this.cadFamiliaURL}`, {headers})
  //     .toPromise()
  //      .then(response =>{
  //       const responseJson = response.json();
  //       const cadastrofamilia = responseJson.content;

  //       const resultado = {
  //         cadastrofamilia,
  //         total: responseJson.totalElements
  //       };
  //       return resultado;
  //      });
  // }

  buscarPeloCadigo(cdFamilia: number): Promise<CadFamilia> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    return this.http.get(`${this.cadFamiliaURL}/${cdFamilia}`, { headers })
     .toPromise()
     .then(response => {
       const cadfamilia = response.json() as CadFamilia;
         return cadfamilia;
     });
  }

  listarTodasFamilia(): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.cadFamiliaURL, { headers })
      .toPromise()
      .then(response => response.json().content);
  }

  //para listar todas os registros no dropdonw
  listarTodasFamiliaDropdown(): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.get(this.cadFamiliaURLPageable, { headers })
      .toPromise()
      .then(response => response.json().content);
  }


  adicionarFamilia(cadFamilia: CadFamilia): Promise<CadFamilia> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
      return this.http.post(this.cadFamiliaURL, JSON.stringify(cadFamilia), { headers })
        .toPromise()
         .then(response => response.json());
  }

  excluirFamilia(cdFamilia: number): Promise<void> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    return this.http.delete(`${this.cadFamiliaURL}/${cdFamilia}`, { headers })
     .toPromise()
     .then(() => null);
  }

  atualizarFamilia(cadFamilia: CadFamilia): Promise<CadFamilia> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.cadFamiliaURL}/${cadFamilia.cdFamilia}`,
     JSON.stringify(cadFamilia), {headers})
      .toPromise()
       .then(response => {
         const cadfamiliaAltera = response.json() as CadFamilia;

         return cadfamiliaAltera;
       });
  }
  buscarFamiliaCodigo(cdFamilia: number): Promise<CadFamilia> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

     return this.http.get(`${this.cadFamiliaURL}/${cdFamilia}`, { headers })
      .toPromise()
       .then(response => {
         const cadfamilia = response.json() as CadFamilia;

         return cadfamilia;
       })
  }


}
