module.exports = (sequelize, Sequelize) => {
   const Vehicle = sequelize.define("vehicle", {
     brand: {
       type: Sequelize.STRING
     },
     type: {
       type: Sequelize.STRING
     },
     model: {
       type: Sequelize.STRING
     },
     release_year: {
       type: Sequelize.STRING
     },
     usable_battery_size: {
       type: Sequelize.DOUBLE
     },
     average_consumption: {
       type: Sequelize.DOUBLE
     },
     current_battery_charge: {
       type: Sequelize.DOUBLE
     },
     id: {
       type: Sequelize.INTEGER,
       primaryKey: true
     }
   },
   {
      tablename: 'Vehicle',
      timestamps: false
   }
   );
 
   return Vehicle;
 };