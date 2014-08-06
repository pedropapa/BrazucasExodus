module.exports.connections = {
  connection: 'memory',
  // sails-disk is installed by default.
  localDiskDb: {
    adapter: 'sails-disk'
  },
  memory: {
    adapter: 'sails-memory'
  },
  remoteMysql: {
    adapter: 'sails-mysql',
    host: this.remoteDatabaseHost,
    user: this.remoteDatabaseUsername,
    password: this.remoteDatabasePassword,
    database: this.remoteDatabaseName
  }
};