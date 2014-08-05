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
    host: '198.211.116.169',
    user: 'brazucas',
    password: this.remoteDatabasePassword,
    database: 'ucp_hom'
  }
};