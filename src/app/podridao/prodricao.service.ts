import { InvContPodridao } from './../core/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
export class PodricaoFiltro {
  nmPodridao: string;
  cdEmpresa: number;
  page = 0;
  size = 15;
}
@Injectable({
  providedIn: 'root'
})
export class ProdricaoService {

  prodricaoUrl ='http://localhost:8082/prodridao'
  constructor(private http: Http) { }

  pesquisar2(cdEmpresa: any): Promise<any> {
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('cdEmpresa', cdEmpresa);
       return this.http.get(`${this.prodricaoUrl}?cdEmpresa=${cdEmpresa}`, {headers})
        .toPromise()
         .then(response =>
           response.json().content)
  }

  consultar(filtro: PodricaoFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      if(filtro.nmPodridao) {
          params.set('nmPodridao', filtro.nmPodridao)
      }

      return this.http.get(`${this.prodricaoUrl}`,
      {headers, search: filtro})
      .toPromise()
       .then(response => {
        const responseJson = response.json();
        const podridao = responseJson.content;

        const resultado = {
          podridao,
          total: responseJson.totalElements
        };
        return resultado;

       })

  }

  adicionar(invContPodridao: InvContPodridao) {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.prodricaoUrl,
      JSON.stringify(invContPodridao), {headers})
       .toPromise()
        .then(response => response.json())
   }

   excluir(cdPodridao: InvContPodridao){
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
     return this.http.delete(`${this.prodricaoUrl}/${cdPodridao}`, {headers})
      .toPromise()
       .then(() => null)
   }

    atualizar(invContPodridao: InvContPodridao) {
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');
        return this.http.put(`${this.prodricaoUrl}/${invContPodridao.cdPodridao}`,
         JSON.stringify(invContPodridao), {headers})
          .toPromise()
           .then(response => {
             const invContPodridaoAltera =  response.json() as InvContPodridao;
              return invContPodridaoAltera
           })

    }
    buscarPeloCodigoPodricao(cdPodridao: number): Promise<InvContPodridao>{
      const headers = new Headers();
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      return this.http.get(`${this.prodricaoUrl}/${cdPodridao}`, {headers})
       .toPromise()
      .then(response => {
        const iluminacao = response.json() as InvContPodridao;
        return iluminacao;
      });
    }

    listarTodasPodricao(){
      const headers = new Headers;
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');
        return this.http.get(`${this.prodricaoUrl}`, {headers})
        .toPromise()
        .then(response => response.json().content);
    }


}
