module.exports = (sequelize, Sequelize) => {
   const Vehicle = sequelize.define("vehicle", {
     brand: {
       type: Sequelize.STRING,
       allowNull: false
     },
     type: {
       type: Sequelize.STRING,
       allowNull: false
     },
     model: {
       type: Sequelize.STRING,
       allowNull: false
     },
     release_year: {
       type: Sequelize.STRING,
       allowNull: false
     },
     usable_battery_size: {
       type: Sequelize.DOUBLE,
       allowNull: false
     },
     average_consumption: {
       type: Sequelize.DOUBLE,
       allowNull: false
     },
     current_battery_charge: {
       type: Sequelize.DOUBLE,
       allowNull: false
     },
     id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false
     }
   },
   {
      tablename: 'Vehicle',
      timestamps: false
   }
   );
 
   return Vehicle;
 };