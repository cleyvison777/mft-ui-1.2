import { InvContIluminacao } from './../core/model';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

export class IluminacaoFiltro {
  nmIluminacao: string;
  cdEmpresa: number;
  page = 0;
  size = 15;
}
@Injectable({
  providedIn: 'root'
})
export class IluminacaoService {

  IluminacaoUrl = 'http://localhost:8082/iluminacao'

  constructor(private http: Http) { }

  pesquisar2( cdEmpresa: any): Promise<any>{
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('cdEmpresa', cdEmpresa);
     return this.http.get(`${this.IluminacaoUrl}?cdEmpresa=${cdEmpresa}`, {headers})
      .toPromise()
       .then(response =>
        response.json().content)
  }

  consultar(filtro: IluminacaoFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      if(filtro.nmIluminacao) {
        params.set('nmIluminacao', filtro.nmIluminacao);
      }

      return this.http.get(`${this.IluminacaoUrl}`,
       {headers, search: filtro})
        .toPromise()
         .then(response =>
          {
            const responseJson = response.json();
            const iluminacao = responseJson.content;

             const resultado = {
               iluminacao,
               total: responseJson.totalElements
             };
             return resultado;
          });
  }

    adiconar(invContIluminacao: InvContIluminacao): Promise<any> {
      const headers = new Headers();
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
      headers.append('Content-Type', 'application/json');
        return this.http.post(this.IluminacaoUrl,
          JSON.stringify(invContIluminacao), {headers})
           .toPromise()
            .then(response => response.json())
    }

      excluir(cdIluminacao: InvContIluminacao): Promise <any> {
        const headers = new Headers;
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
          return this.http.delete(`${this.IluminacaoUrl}/${cdIluminacao}`, {headers})
           .toPromise()
            .then(() => null)
      }

        atualizar(invContIluminacao: InvContIluminacao): Promise<any> {

          const headers = new Headers;
          headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
          headers.append('Content-Type', 'application/json');
               return this.http.put(`${this.IluminacaoUrl}/${invContIluminacao.cdIluminacao}`,
               JSON.stringify(invContIluminacao), {headers})
               .toPromise()
                .then(response => {
                  const invContIluminacaoAltera = response.json() as InvContIluminacao;
                  return invContIluminacaoAltera
                })

        }

        buscarPeloCodigoIluminacao(cdIluminacao: number): Promise<InvContIluminacao>{
          const headers = new Headers();
          headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
          return this.http.get(`${this.IluminacaoUrl}/${cdIluminacao}`, {headers})
           .toPromise()
          .then(response => {
            const iluminacao = response.json() as InvContIluminacao;
            return iluminacao;
          });
        }

        listarTodasInvContDano(){
          const headers = new Headers;
          headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
          headers.append('Content-Type', 'application/json');
            return this.http.get(`${this.IluminacaoUrl}`, {headers})
            .toPromise()
            .then(response => response.json().content);
        }



}
