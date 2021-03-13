const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,

    operatorsAliases: false,
    logging:false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
      logging: false
    }
  }
);

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.sequelize.sync({ force: true });
db.admin = require("./admin.model.js")(sequelize, Sequelize);
db.designer = require("./vehicle_designer.model.js")(sequelize, Sequelize);
db.point = require("./point.model.js")(sequelize, Sequelize);
db.program = require("./charging_program.model.js")(sequelize, Sequelize);
db.provider = require("./energy_provider.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.station = require("./station.model.js")(sequelize, Sequelize);
db.moderator = require("./st_moderator.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.owner = require("./vehicle_owner.model.js")(sequelize, Sequelize);
db.vehicle = require("./vehicle.model.js")(sequelize, Sequelize);


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

db.designer.hasMany(db.vehicle, {foreignKey: "designer_id"});

db.vehicle.belongsTo(db.owner, {foreignKey:"owner_id"});
db.program.belongsTo(db.station, {foreignKey: "station_id"});

db.session.belongsTo(db.vehicle, {foreignKey: "vehicle_id"});
db.session.belongsTo(db.station, {foreignKey: "station_id"});
db.session.belongsTo(db.point, {foreignKey: "point_id"});
db.session.belongsTo(db.program, {foreignKey: "program_id"});

db.point.belongsTo(db.station, {foreignKey: "station_id"});

db.admin.belongsTo(db.user, {foreignKey: "user_id"});
db.designer.belongsTo(db.user, {foreignKey: "user_id"});
db.owner.belongsTo(db.user, {foreignKey: "user_id"});
db.moderator.belongsTo(db.user, {foreignKey: "user_id"});

db.moderator.hasMany(db.station, {foreignKey: "st_moderator_id"});
db.provider.hasMany(db.station, {foreignKey: "provider_id"});

/* +++ */
db.station.belongsTo(db.provider, {foreignKey: "provider_id"});
db.owner.hasMany(db.vehicle, {foreignKey: "designer_id"});

db.ROLES = ["admin", "vehicle_designer", "vehicle_owner","station_admin"];
db.BANNED = [];
module.exports = db;
