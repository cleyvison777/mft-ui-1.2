import { CadMedicao } from './../core/model';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

export class medicaoFiltro{
  page = 0;
  size = 10;
  cdEmpresa: any;
  dtInicioMedica: any;

}
@Injectable({
  providedIn: 'root'
})
export class MedicaoService {
  URLmedicao = 'http://localhost:8082/cadmedicao'

  constructor(private http: Http) { }


  pesquisar2(cdEmpresa: any): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('cdEmpresa', cdEmpresa);

    return this.http.get(`${this.URLmedicao}?cdEmpresa=${cdEmpresa}`, { headers})
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

  adicionar(cadMedicao: CadMedicao): Promise<CadMedicao>{
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
     return this.http.post(this.URLmedicao, JSON.stringify(cadMedicao), { headers })
          .toPromise()
           .then(response => response.json());
  }

 pesquisar(filtro: medicaoFiltro): Promise<any> {
  const params = new URLSearchParams;
  const headers = new Headers;
  headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

  params.set('page', filtro.page.toString());
  params.set('size', filtro.size.toString());
  params.set('cdEmpresa',filtro.cdEmpresa);
   if(filtro.dtInicioMedica){
     params.set('dtInicioMedica', filtro.dtInicioMedica);
   }

   return this.http.get(`${this.URLmedicao}`, {headers, search: filtro})
   .toPromise()
    .then(response => {
        const responseJson = response.json();
        const cadMedicao = responseJson.content;

        const resultado = {
          cadMedicao,
           total: responseJson.totalElements
        };
        return resultado;
    });

 }

   excluir(cdMedicao: number): Promise<void> {
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      return this.http.delete(`${this.URLmedicao}/${cdMedicao}`, {headers})
      .toPromise()
       .then(()=> null);

   }

   atualizar(cadMedicao :CadMedicao): Promise<CadMedicao>{
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.URLmedicao}/${cadMedicao.cdMedicao}`,
     JSON.stringify(cadMedicao), {headers})
      .toPromise()
       .then(response =>{
         const cadMedicaoAltera = response.json() as CadMedicao;
         return cadMedicaoAltera;
       });
   }

   buscarPeloCodigoMedicao(cdMedicao: number): Promise<CadMedicao>{
     const headers = new Headers();
     headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      return this.http.get(`${this.URLmedicao}/${cdMedicao}`, { headers })
       .toPromise()
         .then(response => {
           const cadMedicao = response.json() as CadMedicao;
             return cadMedicao;
         });
   }

   listaMedicao(): Promise<any> {
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
      return this.http.get(this.URLmedicao, { headers })
       .toPromise()
        .then(response =>
          response.json().content);
   }
}
