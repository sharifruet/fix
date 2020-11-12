
const dbConfig = require("../config/db.config.dev.js");

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
db.ServiceHierarchy = require("./serviceHierarchy.model.js")(sequelize, Sequelize);
db.AreaHierarchy = require("./areaHierarchy.model.js")(sequelize, Sequelize);
db.User = require("./user.model.js")(sequelize, Sequelize);
db.Role = require("./role.model.js")(sequelize, Sequelize);
db.Privilege = require("./privilege.model.js")(sequelize, Sequelize);
db.Fileupload = require("./fileupload.model.js")(sequelize, Sequelize);

db.User.belongsToMany(db.Role, { through: 'UserRole' }); 
db.Role.belongsToMany(db.Privilege, { through: 'RolePrivilege' });
 
db.Order = require("./order.model.js")(sequelize, Sequelize);
db.OrderItems = require("./orderItems.model.js")(sequelize, Sequelize);
db.OrderItemPayment = require("./orderItemPayment.model.js")(sequelize, Sequelize);

module.exports = db;

addEntity = (model, entity, cb) => {

  console.log(' - role - ');

  model.create(entity)
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

updateEntity = (model, entity, id, cb) => {
  model.update(entity, {
    where: { id: id }
  })
    .then(num => {
		console.log(num);
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

getById = (model, id, cb) => {
  model.findByPk(id)
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

getByFilter = (model, filter, cb) => {
  model.findAll({ where: filter })
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