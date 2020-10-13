const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.service = require("./service.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);
db.serviceCategory = require("./serviceCategory.model.js")(sequelize, Sequelize);
db.serviceHierarchyDao = require("./serviceHierarchy.model.js")(sequelize, Sequelize);
db.areaHierarchy = require("./areaHierarchy.model.js")(sequelize, Sequelize);
db.userDao = require("./user.model.js")(sequelize, Sequelize);
db.roleDao = require("./role.model.js")(sequelize, Sequelize);

db.userDao.belongsToMany(db.roleDao, { through: 'UserRole' }); 

module.exports = db;

addEntity = (dao, entity, cb) => {

  console.log(' - role - ');

  dao.create(entity)
    .then(data => {
      cb({
        status:0,
        message: "Added successfully",
        data: data
      });
      //res.send(data);
    })
    .catch(err => {
      console.log('ERROR @ INSERT');
      cb({
        status:1,
        message: err.message || "Some error occurred while creating the Service.",
      });
    });
}

updateEntity = (dao, entity, id, cb) => {
  dao.update(entity, {
    where: { id: id }
  })
    .then(num => {
      if (num >= 1) {
        cb({
          status:0,
          message: "Updated successfully",
          data: []
        });
      } else {
        cb({
          status:1,
          message: `Cannot update Service with id=${id}!`
        });
      }
    })
    .catch(err => {
      cb( {
        status:1,
        message: err.message || "Some error occurred while creating the Service.",
      });
    });
}

getById = (dao, id, cb) => {
  dao.findByPk(id)
      .then(data => {
        cb( {
          status:0,
          message: "Fetch successfully",
          data: data
        });
      })
      .catch(err => {
        cb( {
          status:1,
          message: err.message || "Some error occurred while creating the Service.",
        });
      });
}

getByFilter = (dao, filter, cb) => {
  dao.findAll({ where: filter })
      .then(data => {
        cb({
          status:0,
          message:'Fetch successful',
          data:data});
      })
      .catch(err => {
        cb( {
          status:1,
          message: err.message || "Some error occurred while creating the Service.",
        });
      });
}