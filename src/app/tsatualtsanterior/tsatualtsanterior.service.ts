import { SilviculturalService } from './../situacao-silvicultural/silvicultural.service';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { CadTsAtualTsAnterior } from './../core/model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TsFiltro {
  cadTsAtualTsAnterior = new CadTsAtualTsAnterior();

  page = 0;
  size = 15;
  cdTratamentoAnterior: any = this.cadTsAtualTsAnterior.cdTratamentoAnterior;

}

export class TsatualtsanteriorService {

  cadTsAtualTsAnterior = new CadTsAtualTsAnterior();
  situacaoService: SilviculturalService;
  CadTsURL = 'http://localhost:8082/cadtsatualtsanterior';
 constructor(private http: Http) { }


 adicionar(cadTsAtualTsAnterior: CadTsAtualTsAnterior): Promise<CadTsAtualTsAnterior> {
   const params = new URLSearchParams;
   const headers = new Headers();
   headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
   headers.append('Content-Type', 'application/json');
   return this.http.post(this.CadTsURL,
     JSON.stringify(cadTsAtualTsAnterior),
     { headers })
     .toPromise()
     .then(response => response.json());
 }


 consultar(filtro: TsFiltro): Promise<any> {
   const params = new URLSearchParams;
   const headers = new Headers;
   params.set('page', filtro.page.toString());
   params.set('size', filtro.size.toString());
    if (filtro.cdTratamentoAnterior) {
      params.set('cdTratamentoAnterior', filtro.cdTratamentoAnterior);
    }
   return this.http.get(`${this.CadTsURL}?cdTratamentoAnterior=${filtro.cadTsAtualTsAnterior}`, { headers, search: filtro })
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

 buscarPeloTs(cdTratamentoAnterior: any): Promise<any> {
   const headers = new Headers();
   const params = new URLSearchParams;
   headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
  /* params.set('page', filtroTs.page.toString());
   params.set('size', filtroTs.size.toString());*/
   return this.http.get(`${this.CadTsURL}?cdTratamentoAnterior=${cdTratamentoAnterior}`)
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


 excluir(cdTratamentoAnteriorPk: number): Promise<void> {
   const headers = new Headers;
   headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
   return this.http.delete(`${this.CadTsURL}/${cdTratamentoAnteriorPk}`, { headers })
    .toPromise()
     .then(() => null);
 }


   atualizar(cadTsAtualTsAnterior: CadTsAtualTsAnterior): Promise<CadTsAtualTsAnterior> {
         const headers = new Headers;
         headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
         headers.append('Content-Type', 'application/json');
     return this.http.put(`${this.CadTsURL}/${cadTsAtualTsAnterior.cdTratamentoAnteriorPk}`,
       JSON.stringify(cadTsAtualTsAnterior), { headers })
       .toPromise()
       .then(response => {
         const cadTsAtualTsAnteriorAltera = response.json() as CadTsAtualTsAnterior;
         return cadTsAtualTsAnteriorAltera;
       });
   }

   buscarPeloTsAtualiza(cdTratamentoAnteriorPk: number): Promise<CadTsAtualTsAnterior> {
     const headers = new Headers();
     headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
     return this.http.get(`${this.CadTsURL}/${cdTratamentoAnteriorPk}`, { headers })
       .toPromise()
       .then(response => {
         const cadTsAtualTsAnterior = response.json() as CadTsAtualTsAnterior;
         return cadTsAtualTsAnterior;
       });
   }


   buscarPeloTsAnterior(cdTratamento: number): Promise<CadTsAtualTsAnterior> {
     const headers = new Headers();
     headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
     return this.http.get(`${this.CadTsURL}/?cadtsatualtsanterior=${cdTratamento}`, { headers })
       .toPromise()
       .then(response => {
         const cadTsAtualTsAnterior = response.json() as CadTsAtualTsAnterior;
         return cadTsAtualTsAnterior;
       });
   }

   listarTodasTS(): Promise<any>  {
     const headers = new Headers;
     headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
     headers.append('Content-Type', 'application/json');
    return  this.http.get(this.CadTsURL,  { headers })
      .toPromise()
      .then(response => response.json().content);
   }
}
