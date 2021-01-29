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

export class Cadamostragem {
  cdAmostragem: number;
  cdEmpresa = new Cadempresa();
  nmAmostragem: string;
}

export class Cadfrequencia {
  cdFrequencia: number;
  cdEmpresa = new Cadempresa();
  nmFrequencia: string;
}

export class Cadtipodemetodo {
  cdTipoDeMetodo: number;
  cdEmpresa = new Cadempresa();
  nmTipoDeMetodo: string;
}

export class Cadmaterial {
  cdMaterial: number;
  cdEmpresa = new Cadempresa();
  nmMaterial: string;
}

export class Cadtipodeverificador {
  cdTipoDeVerificador: number;
  nmTipoDeVerificador: string;
  nrNiveis: number;
  rotuloNivel1: string;
  rotuloNivel2: string;
  rotuloNivel3: string;
  rotuloNivel4: string;
  rotuloNivel5: string;
}

export class Cadniveldeavaliacao {
  cdNivelDeAvaliacao: number;
  nmNivelDeAvaliacao: string;
  sigla: string;
  txDescricao: string;
}

export class Verificador_m {
  codigo: number;
  cdEmpresa = new Cadempresa();
  cdTipoDeVerificador = new Cadtipodeverificador();
  cdVerificador: number;
  cadNivelDeAvaliacao = new Cadniveldeavaliacao();
  codalfa: string;
  nmverificador: string;
  limiar: string;
  p01_graco: number;
}

export class Verificador_Local_m {
  codigo: number;
  cdEmpresa = new Cadempresa();
  r15_id_Verificador_m = new Verificador_m();
  cdTipoDeVerificador = new Cadtipodeverificador();
  cdLocal1 = new Modlocal1();
  cdLocal2 = new Modlocal2();
  cdLocal3 = new Modlocal3();
  cdTipoDeMetodo = new Cadtipodemetodo();
  txMetodologia: string;
  cdFrequencia = new Cadfrequencia();
  cdAmostragem = new Cadamostragem();
  cdMaterial = new Cadmaterial();
}

export class Modlocal1 {
  cdLocal1: number;
  cdEmpresa = new Cadempresa();
  nmlocal1: string;
}


export class Modlocal2 {
  cdLocal2: number;
  cdEmpresa = new Cadempresa();
  cdLocal1 = new Modlocal1();
  nmLocal2: string;
}



export class Modlocal3 {
  cdLocal3: number;
  cdEmpresa = new Cadempresa();
  cdLocal1 = new Modlocal1();
  cdLocal2 = new Modlocal2();
  nmLocal3: string;
}




export class ModNivel1 {
  cdNivel1: number;
  cdEmpresa = new Cadempresa();
  nmNivel1: string;
}


export class ModNivel2 {
  cdNivel2: number;
  cdNivel1 = new ModNivel1();
  cdEmpresa = new Cadempresa();
  nmNivel2: string;
}



export class ModNivel3 {
  cdNivel1 = new ModNivel1();
  cdNivel2 = new ModNivel2();
  cdNivel3: number;
  cdEmpresa = new Cadempresa();
  nmNivel3: string;
}



export class ModNivel4 {
  cdNivel1 = new ModNivel1();
  cdNivel2 = new ModNivel2();
  cdNivel3 = new ModNivel3();
  cdNivel4: number;
  cdEmpresa = new Cadempresa();
  nmNivel4: string;
}


export class ModMonitoramentoTemplate {
  cdTemplate: number;
  mmTemplate: string;
  cdTipoDeVerificador = new Cadtipodeverificador();
}

export class AppMonitoramento {
  cdMonitoramento: number;
  cdTemplate = new ModMonitoramentoTemplate();
  cdEmpresa = new Cadempresa();
  nmMonitoramento: string;
  cdTipoDeVerificador = new Cadtipodeverificador();
  dtCriacao: Date;
  txLocal: string;
}

export class AppAvaliacao {
  cdAvaliacao: number;
  cdMonitoramento = new AppMonitoramento();
  cdEmpresa = new Cadempresa();
  nmAvaliacao: string;
  dtInicio: Date;
  dtFim: Date;
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

