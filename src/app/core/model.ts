export class Cadempresa {
  cdEmpresa: number;
  nmEmpresa: string;
  nmAbreviado: string;
  nrTelefone: string;
  enderecoCompleto: string;
  txPessoacontato: string;
  cnpjEmpresa: string;
  diretorioArquivos: string;
}

export class MenuEmpresa {
  id:number;
  cdEmpresa: number;
  nmEmpresa: string;
}

export class EmpresaSelecionadaExibicao{
  nmempresa: string;
}

export class empresaSelecionada {
  cdEmpresa: number;
}

export class CadListaEspecie {
  cdListaEsp: number;
  cdEmpresa = new Cadempresa();
  nmListaEsp: string;
}

export class CadAmf {
  cdarea: number;
  cdListaEsp = new CadListaEspecie();
  cdEmpresa = new Cadempresa();
  cdEquacaoAreaBasalPadrao: number;
  cdEquacaovolumeinvtemp: number;
  nmArea: string;
  nmEstado: string;
  nmMunicipio: string;
  latitude1Grau: number;
  latitude1Minuto: number;
  latitude1Orientacao: string;
  latitude2Grau: number;
  latitude2Minuto: number;
  latitude2Orientacao: string;
  longitude1Grau: number;
  longitude1Minuto: number;
  longitude1Orientacao: string;
  longitude2Grau: number;
  longitude2Minuto: number;
  longitude2Orientacao: string;
  precipMediaAnualmm: number;
  precipMediaMensalChuvamm: number;
  precipMediaMensalSecamm: number;
  mesesSeca: string;
  mesesChuva: string;
  tipoLogiaFlorestal: string;
  tipoSolo: string;
  relevo: string;
  mnResponsavel: string;
  enderecoResponsavel: string;
  nrTelefoneResponsavel: string;
  emailResponsavel: string;
  txHistoricoArea: string;
  txObservacaoArea: string;
  lgMudaContada: Boolean;
  lgPalmeiraContada: Boolean;

}
