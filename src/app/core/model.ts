import { logging } from "protractor";

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



export class CadFamilia {
  cdFamilia: number;
  nmFamilia: string;
}

export class Genero {
  cdGenero: number;
  cdFamilia = new CadFamilia();
  nmGenero: string;

}

export class CadGrupoEcologico {
  cdGrupoEcologico: number;
  cdEmpresa = new Cadempresa();
  nmGrupoEcologico: string;
}

export class CadCategoriaProtecao {
  cdCategoriaProtecao: number;
  cdEmpresa = new Cadempresa();
  nmCategoriaProtecao: string;
}

export class UsoEspecie {
  cdUso: number;
  cdEmpresa = new Cadempresa();
  nmUso: string;
  lgMadeira: string;
}

export class CadTipoParcela {
  cdTipoParcela: number;
  cdEmpresa = new Cadempresa();
  nmTipoParcela: string;
  lgEstudoCrescimento: boolean;
}

export class CadClassTamanhoIndividuo {
  cdClasseTamanho: number;
  nmClasseTamanho: string;
}



export class CadTratamentoSilvicultural {
  cdTratamento: number;
  cdEmpresa = new Cadempresa();
  nmTratamento: string;
  cdTratamentoAnterior = new Array<CadTsAtualTsAnterior>();
}

export class CadTsAtualTsAnterior {
  cdTratamentoAnteriorPk: number;
  cdTratamentoAnterior = new CadTratamentoSilvicultural();
  cdEmpresa = new Cadempresa();
  cdTratamentotual = new CadTratamentoSilvicultural();
}

export class ClasseFloresta{

  cdClassefloresta: number;
  cdEmpresa = new Cadempresa();
  nmClassefloresta: string;
  enderecoImagem: string;


}
export class CadMedicao {
  cdMedicao: number;
  cdEmpresa = new Cadempresa();
  cdArea = new CadAmf();
  dtInicioMedica: Date;
  txObservacao: string

}

export class CadEquacao {

  cdEquacao: number;
  cdEmpresa = new Cadempresa();
	nmEquacao: string;
  Equacao: string;
  txObservacaoEquacao: string;
  imgEquacao: string;
}
export class CadClasseDeTamanho {

  cdClasseTamanho: number;
  cdEmpresa = new Cadempresa();
  cdArea = new CadAmf();
  cdEquacao = new CadEquacao();
	dapMinimoComFustemm: number;
  dapMaximoComFustemm: number;
	dapMinimoSemFustemm: number;
	dapMaximoSemFustemm: number;
  alturaMinimam: number;
	alturaMaximam: number;
	comprimentoParcelam: number;
  larguraParcelam: number;
	cdFormatoSubParcela: number;
	dimensao1SubParcelam: number;
	dimensao2SubParcelam: number;
  dimensao3SubParcelam: number;
	padraoCrescAnualMiniMomm: number;
  padraoCrescAnualMaxiMomm: number;
	dapMaxiMoingMedicao2mm: number;
	nrSubParcelasPorParcela: number;

}

export class GeraParcelESubParcela {

  id: number;
  cdEmpresa = new Cadempresa();
  cdArea = new CadAmf();
  cdTipoParcela = new  CadTipoParcela;
  cdParcelaInicio: number;
  nrParcelas: number;
  nrSubParcelasPorParcelas: number
}
