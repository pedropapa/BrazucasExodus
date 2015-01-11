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
    PrecoGasolina: {
      type: 'integer'
    },
    PrecoAlcool: {
      type: 'integer'
    },
    PrecoDiesel: {
      type: 'integer'
    },
    PrecoAditivada: {
      type: 'integer'
    },
    PrecoQuerosene: {
      type: 'integer'
    },
    PCerveja: {
      type: 'integer'
    },
    PRefrigerante: {
      type: 'integer'
    },
    PWhisky: {
      type: 'integer'
    },
    PSanduiche: {
      type: 'integer'
    },
    PBigZuca: {
      type: 'integer'
    },
    PPizza: {
      type: 'integer'
    },
    PQuentinha: {
      type: 'integer'
    },
    PCafe: {
      type: 'integer'
    },
    PRedBull: {
      type: 'integer'
    },
    PCaldo: {
      type: 'integer'
    },
    PCelular: {
      type: 'integer'
    },
    PRevisao: {
      type: 'integer'
    },
    PFaca: {
      type: 'integer'
    },
    PTravas: {
      type: 'integer'
    },
    PRadio: {
      type: 'integer'
    },
    PFazerMotor: {
      type: 'integer'
    },
    PNoteBook: {
      type: 'integer'
    },
    PCDPlayer: {
      type: 'integer'
    },
    PAlarmeR: {
      type: 'integer'
    },
    PSocoIngles: {
      type: 'integer'
    },
    PParaquedas: {
      type: 'integer'
    },
    PFlores: {
      type: 'integer'
    },
    PCamera: {
      type: 'integer'
    },
    PPatins: {
      type: 'integer'
    },
    PAlarmeV: {
      type: 'integer'
    },
    PBateria: {
      type: 'integer'
    },
    PIscas: {
      type: 'integer'
    },
    PImunizantes: {
      type: 'integer'
    },
    PEstepes: {
      type: 'integer'
    },
    PSementes: {
      type: 'integer'
    },
    PTurbo: {
      type: 'integer'
    },
    PVara: {
      type: 'integer'
    },
    PAntiFurto: {
      type: 'integer'
    },
    PBlindagem: {
      type: 'integer'
    },
    PPassagem: {
      type: 'integer'
    },
    PBengala: {
      type: 'integer'
    },
    PKatana: {
      type: 'integer'
    },
    PSerraEletrica: {
      type: 'integer'
    },
    PGPS: {
      type: 'integer'
    },
    PAutomatico: {
      type: 'integer'
    },
    PAlarme: {
      type: 'integer'
    },
    PRastreador: {
      type: 'integer'
    },
    PABS: {
      type: 'integer'
    },
    PLimitador: {
      type: 'integer'
    },
    PPa: {
      type: 'integer'
    },
    PVibrador: {
      type: 'integer'
    },
    PPneus: {
      type: 'integer'
    },
    P9mm: {
      type: 'integer'
    },
    P9mmS: {
      type: 'integer'
    },
    PDesertEagle: {
      type: 'integer'
    },
    PUzi: {
      type: 'integer'
    },
    PTec9: {
      type: 'integer'
    },
    PSMG: {
      type: 'integer'
    },
    PEscopeta: {
      type: 'integer'
    },
    PEscopetaS: {
      type: 'integer'
    },
    PEscopetaC: {
      type: 'integer'
    },
    PAK47: {
      type: 'integer'
    },
    PM4: {
      type: 'integer'
    },
    PRifle: {
      type: 'integer'
    },
    PSniper: {
      type: 'integer'
    },
    PGranadas: {
      type: 'integer'
    },
    PMolotov: {
      type: 'integer'
    },
    PMina: {
      type: 'integer'
    },
    PFlash: {
      type: 'integer'
    },
    PDinamites: {
      type: 'integer'
    },
    PSmoke: {
      type: 'integer'
    },
    PBarril: {
      type: 'integer'
    },
    PColete: {
      type: 'integer'
    },
    PCamuflagem: {
      type: 'integer'
    },
    PLancaChamas: {
      type: 'integer'
    },
    PLancaMisseis: {
      type: 'integer'
    },
    PExtintor: {
      type: 'integer'
    },
    PTacoGolf: {
      type: 'integer'
    },
    PTacoBilhar: {
      type: 'integer'
    },
    PTacoBaseball: {
      type: 'integer'
    },
    PPrancha: {
      type: 'integer'
    },
    Comissao: {
      type: 'integer'
    },
    POculos: {
      type: 'integer'
    },
    PCapacete: {
      type: 'integer'
    },
    PNeon: {
      type: 'integer'
    },
    PChapeu: {
      type: 'integer'
    },
    PMochila: {
      type: 'integer'
    },
    PGarra: {
      type: 'integer'
    },
    PMascara: {
      type: 'integer'
    },
    PCompressor: {
      type: 'integer'
    },
    PBalao: {
      type: 'integer'
    },
    PTeaser: {
      type: 'integer'
    },
    PCurativos: {
      type: 'integer'
    },
    PTratamento: {
      type: 'integer'
    },
    PKitMedico: {
      type: 'integer'
    },
    PGlicose: {
      type: 'integer'
    },
    PReanimar: {
      type: 'integer'
    },
    PPlanoDeSaude: {
      type: 'integer'
    }
  }
};




