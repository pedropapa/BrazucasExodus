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

  attributes: {
    ID: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    ULTIMA_ATUALIZACAO: {
      type: 'varchar',
      unique: false,
      required: false
    },
    NOME: {
      type: 'string',
      maxLength: 45,
      unique: true,
      required: true
    },
    Senha: {
      type: 'string',
      unique: false,
      required: true,
      maxLength: 45
    },
    Administrador: {
      type: 'integer',
      required: false,
      maxLength: 1
    },
    CamMode: {
      type: 'integer',
      required: false,
      maxLength: 2
    },
    UltimoLogin: {
      type: 'string',
      required: false
    },
    Pontos: {
      type: 'integer',
      required: false,
      maxLength: 7
    },
    Matou: {
      type: 'integer',
      required: false,
      maxLength: 6
    },
    Morreu: {
      type: 'integer',
      required: false,
      maxLength: 7
    },
    IP: {
      type: 'string',
      required: false,
      maxLength: 50
    },
    TempoConectado: {
      type: 'integer',
      required: false,
      maxLength: 10
    },
    PROEZAS: {
      type: 'integer',
      required: false,
      maxLength: 3
    },
    Score: {
      type: 'integer',
      required: false,
      maxLength: 7
    },
    CompletouPartida: {
      type: 'integer',
      required: false,
      maxLength: 5
    },
    ReturnPartida: {
      type: 'integer',
      required: false,
      maxLength: 5
    },
    ReturnPosX: {
      type: 'float',
      required: false
    },
    ReturnPosY: {
      type: 'float',
      required: false
    },
    ReturnPosZ: {
      type: 'float',
      required: false
    },
    ReturnPosA: {
      type: 'float',
      required: false
    },
    ReturnCPS: {
      type: 'integer',
      required: false
    },
    SonsInativos: {
      type: 'integer',
      required: false
    },
    radioid: {
      type: 'integer',
      required: false
    },
    radionome: {
      type: 'string',
      required: false
    },
    radioouvintes: {
      type: 'integer',
      required: false
    },
    NivelModerador: {
      type: 'integer',
      required: false
    },
    QuandoDescalar: {
      type: 'integer',
      required: false
    },
    Banido: {
      type: 'integer',
      required: false
    },
    PMBloqueada: {
      type: 'integer',
      required: false
    },
    IgnorarPMs: {
      type: 'integer',
      required: false
    },
    KitFavorito: {
      type: 'integer',
      required: false
    },
    VerCmds: {
      type: 'integer',
      required: false
    },
    SkinPersonalizada: {
      type: 'integer',
      required: false
    },
    Advertencias: {
      type: 'integer',
      required: false
    },
    RazaoBanido: {
      type: 'integer',
      required: false
    },
    ProibidoDB: {
      type: 'integer',
      required: false
    },
    VkickBloqueado: {
      type: 'integer',
      required: false
    },
    PodeConectar: {
      type: 'integer',
      required: false
    },
    Creditos: {
      type: 'integer',
      required: false
    },
    Mudo: {
      type: 'integer',
      required: false
    },
    BarrisBloqueados: {
      type: 'integer',
      required: false
    },
    TENTATIVAS_LOGIN: {
      type: 'integer',
      required: false
    },
    NivelDeModerador: {
      type: 'integer',
      required: false
    },
    ChefesMortos: {
      type: 'integer',
      required: false
    },
    EstiloDeLuta: {
      type: 'integer',
      required: false
    },
    Delay: {
      type: 'integer',
      required: false
    },
    Fake: {
      type: 'integer',
      required: false
    },
    Voz: {
      type: 'integer',
      required: false
    },
    HDFile: {
      type: 'integer',
      required: false
    },
    UnbanDay: {
      type: 'integer',
      required: false
    },
    Kills: {
      type: 'integer',
      required: false
    },
    Bloqueada: {
      type: 'integer',
      required: false
    },
    mpre: {
      type: 'integer',
      required: false
    },
    VKickAutorizadoPorAdmin: {
      type: 'integer',
      required: false
    },
    DBProibido: {
      type: 'integer',
      required: false
    },
    Assistencias: {
      type: 'integer',
      required: false
    },
    BetaTester: {
      type: 'integer',
      required: false
    },
    autorec: {
      type: 'integer',
      required: false
    },
    DResposta: {
      type: 'string',
      required: false
    },
    DPergunta: {
      type: 'string',
      required: false
    },
    Moderador: {
      type: 'integer',
      required: false
    }
  }
};




