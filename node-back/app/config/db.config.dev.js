module.exports = {
  HOST: "localhost",
  USER: "fix-dev",
  PASSWORD: "fix@123",
  DB: "fix",
  PORT: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
