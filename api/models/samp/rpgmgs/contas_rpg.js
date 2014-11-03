/**
 * Usuario
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  connection: 'sampDb',
  migrate: 'safe',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    ID: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    ULTIMA_ATUALIZACAO: {
      type: 'datetime',
      defaultsTo: function() {return new Date();}
    },
    TRAVADO: {
      type: 'integer',
      maxLength: 1
    },
    NICK: {
      type: 'string',
      maxLength: 45,
      required: true,
      unique: true
    },
    Administrador: {
      type: 'integer',
      maxLength: 1
    },
    IP: {
      type: 'string',
      maxLength: 20
    },
    CONVITE: {
      type: 'string',
      maxLength: 45
    },
    PAGINA_ATUAL: {
      type: 'string',
      maxLength: 100
    },
    TENTATIVAS_LOGIN: {
      type: 'integer',
      maxLength: 3
    },
    Senha: {
      type: 'string',
      maxLength: 45,
      required: true
    },
    EMAIL: {
      type: 'email',
      required: true,
      unique: true
    },
    VEICULOS_ENCOMENDADOS: {
      type: 'integer',
      maxLength: 3
    },
    EXCLUIR_CONTA: {
      type: 'integer',
      maxLength: 1
    },
    EXCLUIR_CONTA_TEMPO: {
      type: 'integer',
      maxLength: 15
    },
    FORUM_USER: {
      type: 'string',
      maxLength: 45
    },
    FORUM_SENHA: {
      type: 'string',
      maxLength: 45
    },
    FORUM_ATIVO: {
      type: 'integer',
      maxLength: 1
    },
    Sx: {
      type: 'float'
    },
    Sy: {
      type: 'float'
    },
    Sz: {
      type: 'float'
    },
    Sa: {
      type: 'float'
    },
    Interior: {
      type: 'integer',
      maxLength: 5
    },
    VirtualWorld: {
      type: 'integer',
      maxLength: 5
    },
    Skin: {
      type: 'integer',
      maxLength: 5
    },
    CasaAtiva: {
      type: 'integer',
      maxLength: 5
    },
    ContaBancaria: {
      type: 'integer',
      maxLength: 15
    },
    DinheiroEmMaos: {
      type: 'integer',
      maxLength: 15
    },
    Profissao: {
      type: 'integer',
      maxLength: 5
    },
    Estilo: {
      type: 'integer',
      maxLength: 5
    },
    HT: {
      type: 'integer',
      maxLength: 1
    },
    HN: {
      type: 'integer',
      maxLength: 1
    },
    HA: {
      type: 'integer',
      maxLength: 1
    },
    Preso: {
      type: 'integer',
      maxLength: 1
    },
    Divida: {
      type: 'integer',
      maxLength: 15
    },
    NivelDrogas: {
      type: 'integer',
      maxLength: 5
    },
    NivelAlcool: {
      type: 'integer',
      maxLength: 5
    },
    NivelProcurado: {
      type: 'integer',
      maxLength: 5
    },
    Familia: {
      type: 'integer',
      maxLength: 3
    },
    CPN: {
      type: 'integer',
      maxLength: 5
    },
    CPNu: {
      type: 'integer',
      maxLength: 5
    },
    CPM: {
      type: 'integer',
      maxLength: 5
    },
    CPMu: {
      type: 'integer',
      maxLength: 5
    },
    CPB: {
      type: 'integer',
      maxLength: 5
    },
    CPMu: {
      type: 'integer',
      maxLength: 5
    },
    Experiencia: {
      type: 'integer',
      maxLength: 5
    },
    ArmasLicensa: {
      type: 'integer',
      maxLength: 5
    },
    Mortos: {
      type: 'integer',
      maxLength: 5
    },
    Painel: {
      type: 'integer',
      maxLength: 5
    },
    Velocimetro: {
      type: 'integer',
      maxLength: 5
    },
    TempoPreso: {
      type: 'integer',
      maxLength: 5
    },
    Marcado: {
      type: 'integer',
      maxLength: 5
    },
    PlanoDeSaude: {
      type: 'integer',
      maxLength: 5
    },
    TmpProxMud: {
      type: 'integer',
      maxLength: 5
    },
    PodeMalhar: {
      type: 'integer',
      maxLength: 5
    },
    TempoMalhando: {
      type: 'integer',
      maxLength: 5
    },
    ExperienciaAnterior: {
      type: 'integer',
      maxLength: 5
    },
    SemanaSalarioRecebido: {
      type: 'integer',
      maxLength: 5
    },
    PropriedadeEmQueTrabalha: {
      type: 'integer',
      maxLength: 5
    },
    DataNascimento: {
      type: 'string',
      maxLength: 15
    },
    Sexo: {
      type: 'integer',
      maxLength: 5
    },
    Bloqueada: {
      type: 'integer',
      maxLength: 5
    },
    Impostos: {
      type: 'integer',
      maxLength: 5
    },
    SemanaIRRecolhido: {
      type: 'integer',
      maxLength: 5
    },
    SemanaPlanoSaude: {
      type: 'integer',
      maxLength: 5
    },
    SemanaEmprestimo: {
      type: 'integer',
      maxLength: 5
    },
    SaudeTotal: {
      type: 'integer',
      maxLength: 5
    },
    SemanaCartao: {
      type: 'integer',
      maxLength: 5
    },
    Taxas: {
      type: 'integer',
      maxLength: 5
    },
    SemanaTaxaHotel: {
      type: 'integer',
      maxLength: 5
    },
    UltimoLogin: {
      type: 'string',
      maxLength: 15
    },
    TempoVerificacao: {
      type: 'integer',
      maxLength: 15
    },
    Bilhete: {
      type: 'integer',
      maxLength: 5
    },
    ForcaFisica: {
      type: 'integer',
      maxLength: 5
    },
    TempoConectado: {
      type: 'integer',
      maxLength: 15
    },
    NivelBoxe: {
      type: 'integer',
      maxLength: 15
    },
    NivelStreet: {
      type: 'integer',
      maxLength: 15
    },
    NivelKarate: {
      type: 'integer',
      maxLength: 15
    },
    IscasParaPesca: {
      type: 'integer',
      maxLength: 15
    },
    Fome: {
      type: 'integer',
      maxLength: 15
    },
    Respeito: {
      type: 'integer',
      maxLength: 15
    },
    Ui: {
      type: 'integer',
      maxLength: 15
    },
    Uv: {
      type: 'integer',
      maxLength: 15
    },
    UxS: {
      type: 'float'
    },
    UyS: {
      type: 'float'
    },
    UzS: {
      type: 'float'
    },
    TempoAcordado: {
      type: 'integer',
      maxLength: 5
    },
    Camuflagem: {
      type: 'integer',
      maxLength: 5
    },
    XpDiaria: {
      type: 'integer',
      maxLength: 5
    },
    Algemado: {
      type: 'integer',
      maxLength: 5
    },
    Atum: {
      type: 'integer',
      maxLength: 5
    },
    Bagre: {
      type: 'integer',
      maxLength: 5
    },
    Cavala: {
      type: 'integer',
      maxLength: 5
    },
    Dourado: {
      type: 'integer',
      maxLength: 5
    },
    Garoupa: {
      type: 'integer',
      maxLength: 5
    },
    Tainha: {
      type: 'integer',
      maxLength: 5
    },
    JogadorAutorizado: {
      type: 'integer',
      maxLength: 1
    },
    Colete: {
      type: 'integer',
      maxLength: 5
    },
    Dinamites: {
      type: 'integer',
      maxLength: 5
    },
    Flashes: {
      type: 'integer',
      maxLength: 5
    },
    Teaser: {
      type: 'integer',
      maxLength: 5
    },
    Fortuna: {
      type: 'integer',
      maxLength: 15
    },
    ProcuradoEx: {
      type: 'integer',
      maxLength: 5
    },
    Desejo: {
      type: 'integer',
      maxLength: 5
    },
    ProfissaoAnterior: {
      type: 'integer',
      maxLength: 5
    },
    Alvo: {
      type: 'integer',
      maxLength: 5
    },
    Andar: {
      type: 'integer',
      maxLength: 5
    },
    Salario: {
      type: 'integer',
      maxLength: 5
    },
    MudouDeProfs: {
      type: 'integer',
      maxLength: 5
    },
    Gerente: {
      type: 'integer',
      maxLength: 5
    },
    Juros: {
      type: 'integer',
      maxLength: 5
    },
    Creditos: {
      type: 'integer',
      maxLength: 25
    },
    Celular: {
      type: 'integer',
      maxLength: 5
    },
    NumeroCelular: {
      type: 'integer',
      maxLength: 5
    },
    Chat: {
      type: 'integer',
      maxLength: 5
    },
    CelularCapa: {
      type: 'integer',
      maxLength: 5
    },
    Multas: {
      type: 'integer',
      maxLength: 5
    },
    Balao: {
      type: 'integer',
      maxLength: 5
    },
    TempoPena: {
      type: 'integer',
      maxLength: 5
    },
    TempoPenaTotal: {
      type: 'integer',
      maxLength: 5
    },
    Julgado: {
      type: 'integer',
      maxLength: 5
    },
    Mascara: {
      type: 'integer',
      maxLength: 5
    },
    Chapeu: {
      type: 'integer',
      maxLength: 5
    },
    Oculos: {
      type: 'integer',
      maxLength: 5
    },
    Capacete: {
      type: 'integer',
      maxLength: 5
    },
    UsandoChapeu: {
      type: 'integer',
      maxLength: 5
    },
    UsandoOculos: {
      type: 'integer',
      maxLength: 5
    },
    UsandoMascara: {
      type: 'integer',
      maxLength: 5
    },
    NivelPesca: {
      type: 'integer',
      maxLength: 5
    },
    Infracoes: {
      type: 'integer',
      maxLength: 5
    },
    Assaltante: {
      type: 'integer',
      maxLength: 5
    },
    VezesPreso: {
      type: 'integer',
      maxLength: 5
    },
    DataMorte: {
      type: 'string',
      maxLength: 25
    },
    Morto: {
      type: 'integer',
      maxLength: 5
    },
    ValorImoveis: {
      type: 'integer',
      maxLength: 15
    },
    ValorVeiculos: {
      type: 'integer',
      maxLength: 15
    },
    Hotel: {
      type: 'integer',
      maxLength: 5
    },
    MudouDeFamilia: {
      type: 'integer',
      maxLength: 5
    },
    Entregas: {
      type: 'integer',
      maxLength: 5
    },
    Moderador: {
      type: 'integer',
      maxLength: 5
    },
    Clinica: {
      type: 'integer',
      maxLength: 5
    },
    Patins: {
      type: 'integer',
      maxLength: 5
    },
    Mudo: {
      type: 'integer',
      maxLength: 5
    },
    Banido: {
      type: 'integer',
      maxLength: 5
    },
    MotivoBan: {
      type: 'integer',
      maxLength: 5
    },
    IPBanido: {
      type: 'string',
      maxLength: 25
    },
    Laptop: {
      type: 'integer',
      maxLength: 5
    },
    VaraDePesca: {
      type: 'integer',
      maxLength: 5
    },
    Advertencias: {
      type: 'integer',
      maxLength: 5
    },
    Transparencia: {
      type: 'integer',
      maxLength: 5
    },
    Relogio: {
      type: 'integer',
      maxLength: 5
    },
    Aplicacoes: {
      type: 'integer',
      maxLength: 5
    },
    Herdeiro: {
      type: 'integer',
      maxLength: 5
    },
    SalarioDisponivel: {
      type: 'integer',
      maxLength: 15
    },
    TempoDesmanche: {
      type: 'integer',
      maxLength: 5
    },
    Terrorista: {
      type: 'integer',
      maxLength: 5
    },
    PresoNoDeposito: {
      type: 'integer',
      maxLength: 5
    },
    Fake: {
      type: 'integer',
      maxLength: 5
    },
    PodeMarcar: {
      type: 'integer',
      maxLength: 5
    },
    TransparenciaV: {
      type: 'integer',
      maxLength: 5
    },
    CartaoDebito: {
      type: 'integer',
      maxLength: 5
    },
    BancoCartao: {
      type: 'integer',
      maxLength: 5
    },
    Saude: {
      type: 'integer',
      maxLength: 5
    },
    Trabalhos: {
      type: 'integer',
      maxLength: 5
    },
    HDFile: {
      type: 'integer',
      maxLength: 5
    },
    Garra: {
      type: 'integer',
      maxLength: 5
    },
    Admin: {
      type: 'integer',
      maxLength: 5
    },
    SemanaEmpregado: {
      type: 'integer',
      maxLength: 5
    },
    Dividas: {
      type: 'integer',
      maxLength: 5
    },
    Casamento: {
      type: 'integer',
      maxLength: 5
    },
    EstadoCivil: {
      type: 'integer',
      maxLength: 5
    },
    Fiancavel: {
      type: 'integer',
      maxLength: 5
    },
    UltimoLoginTs: {
      type: 'string',
      maxLength: 15
    },
    WC_BLOQUEADO: {
      type: 'integer',
      maxLength: 5
    },
    Moderacao: {
      type: 'integer',
      maxLength: 5
    },
    ToqueCelular: {
      type: 'integer',
      maxLength: 5
    },
    DJ: {
      type: 'integer',
      maxLength: 5
    },
    CriouFamilia: {
      type: 'integer',
      maxLength: 5
    },
    BanidoPor: {
      type: 'string',
      maxLength: 45
    },
    Inativo: {
      type: 'integer',
      maxLength: 5
    },
    AtingidoRecentemente: {
      type: 'integer',
      maxLength: 5
    },
    QtdadeDepositos: {
      type: 'integer',
      maxLength: 5
    },
    OUVINTE_TEMPO: {
      type: 'integer',
      maxLength: 15
    },
    DJ_CREDITOS: {
      type: 'integer',
      maxLength: 15
    },
    DeslogouBanco: {
      type: 'integer',
      maxLength: 5
    },
    nickVI: {
      type: 'string',
      maxLength: 45,
      unique: true
    },
    ModLog: {
      type: 'integer',
      maxLength: 5
    },
    VkickBloqueado: {
      type: 'integer',
      maxLength: 5
    },
    TempoReportar: {
      type: 'integer',
      maxLength: 5
    },
    Advertencia: {
      type: 'integer',
      maxLength: 5
    },
    AdvertenciaRpg: {
      type: 'integer',
      maxLength: 5
    },
    TempoParaEntrevistar: {
      type: 'integer',
      maxLength: 15
    },
    SaudeSalva: {
      type: 'integer',
      maxLength: 5
    },
    Ferido: {
      type: 'integer',
      maxLength: 5
    },
    NivelContrato: {
      type: 'integer',
      maxLength: 5
    },
    Mortes: {
      type: 'integer',
      maxLength: 5
    },
    AdvertenciaProfissao: {
      type: 'integer',
      maxLength: 5
    },
    Diarias: {
      type: 'integer',
      maxLength: 5
    },
    VKickAutorizadoPorAdmin: {
      type: 'integer',
      maxLength: 5
    }
  }
}
