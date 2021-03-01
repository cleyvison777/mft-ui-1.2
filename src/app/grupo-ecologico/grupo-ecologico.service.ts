import { CadGrupoEcologico } from './../core/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';


export class GrupoEcologicoFiltro {
  nmGrupoEcologico: string;
  cdEmpresa: number;
  page = 0;
  size = 15;

}

@Injectable({
  providedIn: 'root'
})
export class GrupoEcologicoService {

  GrupoEcologicoURL = 'http://localhost:8082/grupoecologico';
  constructor( private http: Http) { }


  pesquisar2(cdEmpresa: any): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      params.set('cdEmpresa', cdEmpresa);
        return this.http.get(`${this.GrupoEcologicoURL}?cdEmpresa=${cdEmpresa}`, { headers})
        .toPromise()
        .then(response => response.json().content)


  };

  //consultar

  consulta(filtro: GrupoEcologicoFiltro): Promise<any>{
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('page', filtro.page.toString());
    params.set('size', filtro.size.toString());

     if(filtro.nmGrupoEcologico) {
      params.set('nmGrupoEcologico', filtro.nmGrupoEcologico);
     }

     return this.http.get(`${this.GrupoEcologicoURL}`, { headers, search: filtro })
      .toPromise()
       .then(response => {
        const responseJson = response.json();
        const cadgrupoEcologico = responseJson.content;

        const resultado = {
          cadgrupoEcologico,
          total: responseJson.totalElements
        };
        return resultado;
       });
  }

  adicionar(cadGrupoEcologico: CadGrupoEcologico){
    const params = new URLSearchParams;
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

      return this.http.post(this.GrupoEcologicoURL,
        JSON.stringify(cadGrupoEcologico), { headers })
        .toPromise()
         .then(response => response.json());
  }

//exclui o resgitro da tabela
excluir(cdGrupoEcologico: number): Promise<void> {
  const headers = new Headers;
  headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
   return this.http.delete(`${this.GrupoEcologicoURL}/${cdGrupoEcologico}`, { headers })
    .toPromise()
     .then(() => null);
 }

 atualizar(cadGrupoEcologico: CadGrupoEcologico): Promise<CadGrupoEcologico> {
  const headers = new Headers;
  headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
  headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.GrupoEcologicoURL}/${cadGrupoEcologico.cdGrupoEcologico}`,
    JSON.stringify(cadGrupoEcologico), { headers })
     .toPromise()
      .then(response => {
        const grupoEcologicoAltera = response.json() as CadGrupoEcologico;
        return grupoEcologicoAltera;
      });
   }

   buscarPeloCodigoGrupoEcologico(cdGrupoEcologico: number): Promise<CadGrupoEcologico>{
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
       return this.http.get(`${this.GrupoEcologicoURL}/${cdGrupoEcologico}`, { headers })
        .toPromise()
         .then(response =>{
           const cadGrupoEcologico = response.json() as CadGrupoEcologico;
           return cadGrupoEcologico;
         });
   }

   listarGrupoEcologico(): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
      return this.http.get(this.GrupoEcologicoURL, { headers })
       .toPromise()
        .then(response => response.json().content);
   }

}
