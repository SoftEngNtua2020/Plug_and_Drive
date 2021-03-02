const config = require("../config/db.config.js");
const bcrypt = require("bcryptjs");
const init = require("./database_init.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
      logging: true
    }
  }
);

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;




//db.sequelize.sync({ force: true });



db.admin = require("./admin.model.js")(sequelize, Sequelize);
db.designer = require("./vehicle_designer.model.js")(sequelize, Sequelize);
db.program = require("./charging_program.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.station = require("./station.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.owner = require("./vehicle_owner.model.js")(sequelize, Sequelize);
db.vehicle = require("./vehicle.model.js")(sequelize, Sequelize);

/*
db.admin.sync({ force: false }).then(() => {
    console.log("admin model created successfully")})
    .then(()=>   { 
        db.admin.bulkCreate(init.admins)
    })

*/
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.admin.belongsToMany(db.station, {
  through: "Admin_Station",
  foreignKey: "admin_id",
  otherKey: "station_id"
});
db.station.belongsToMany(db.admin, {
  through: "Admin_Station",
  foreignKey: "station_id",
  otherKey: "admin_id"
});

db.owner.hasMany(db.vehicle,{foreignKey:"owner_id"});
db.designer.hasMany(db.vehicle, {foreignKey: "designer_id"});
db.vehicle.hasMany(db.session, {foreignKey: "vehicle_id"});
db.station.hasMany(db.session, {foreignKey: "station_id"});
db.station.hasMany(db.program, {foreignKey: "station_id"});





db.ROLES = ["owner", "admin", "designer"];

module.exports = db;