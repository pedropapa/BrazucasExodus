module.exports.connections = {
  connection: 'memory',
  // sails-disk is installed by default.
  localDiskDb: {
    adapter: 'sails-disk'
  },
  memory: {
    adapter: 'sails-memory'
  },
  sampDb: {
    adapter: 'sails-mysql',
    host: ':mysqlHost',
    user: ':mysqlUser',
    password: ':mysqlPass',
    database: ':mysqlDb'
  }
};