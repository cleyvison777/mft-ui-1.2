import { CadTipoParcela } from './../core/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';


export class TipoParcelaFiltro {
  nmTipoParcela: string;
  page = 0;
  size = 10;
  cdEmpresa: any
}
@Injectable({
  providedIn: 'root'
})
export class TipoParcelaService {
TipoParcelaURL='http://localhost:8082/cadtipoparcela';
  constructor(private http: Http) { }


  pesquisar2(cdEmpresa: any): Promise<any> {

    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('cdEmpresa', cdEmpresa);

    return this.http.get(`${this.TipoParcelaURL}?cdEmpresa=${cdEmpresa}`, { headers})
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


  pesquisaTipoParcela(filtro: TipoParcelaFiltro): Promise<any> {
    const params = new URLSearchParams;
    const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    params.set('page', filtro.page.toString());
    params.set('size', filtro.size.toString());
    params.set('cdEmpresa',filtro.cdEmpresa);


    if(filtro.nmTipoParcela){
      params.set('nmTipoParcela', filtro.nmTipoParcela);
    }

    return this.http.get(`${this.TipoParcelaURL}`, { headers, search: filtro})
     .toPromise()
      .then(response => {
        const responseJason = response.json();
        const listaTipoparcela = responseJason.content;

        const resultado = {
          listaTipoparcela,
          total: responseJason.totalElements
        };
         return resultado;
      });

}

listarTodasParcelas(): Promise<any> {
  const headers = new Headers;
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.TipoParcelaURL}`, {headers})
     .toPromise()
     .then(response => response.json().content);
}

adicionarTipoParcela(cadTipoParcela: CadTipoParcela): Promise<CadTipoParcela> {
  const headers = new Headers;
  headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
  headers.append('Content-Type', 'application/json');

 return this.http.post(this.TipoParcelaURL, JSON.stringify(cadTipoParcela), { headers})
  .toPromise()
   .then(response => response.json());
}
excluirTipoParcela(cdTipoParcela: number): Promise<void> {
  const headers = new Headers;
  headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
   return this.http.delete(`${this.TipoParcelaURL}/ ${cdTipoParcela}`, {headers})
    .toPromise()
     .then(() => null);
}

atualizar(cadTipoParcela: CadTipoParcela): Promise<CadTipoParcela>{
  const headers = new Headers;
  headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
  headers.append('Content-Type', 'application/json');
   return this.http.put(`${this.TipoParcelaURL}/${cadTipoParcela.cdTipoParcela}`,
   JSON.stringify(cadTipoParcela), {headers})
    .toPromise()
     .then(response => {
       const cadtipoparcelaAltera = response.json() as CadTipoParcela;
       return cadtipoparcelaAltera;
     });
}

buscarTipoParcelaPeloCodigo(cdTipoParcela: number): Promise<CadTipoParcela>{
  const headers = new Headers();
  headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
   return this.http.get(`${this.TipoParcelaURL}/${cdTipoParcela}`, {headers})
    .toPromise()
     .then(response => {
       const cadTipoParcela = response.json() as CadTipoParcela;

       return cadTipoParcela;
     });
}
}
