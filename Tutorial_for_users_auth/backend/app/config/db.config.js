module.exports = {
  HOST: "snf-17690.ok-kno.grnetcloud.net",
  USER: "master",
  PASSWORD: "root",
  DB: "PnG_Auth",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};