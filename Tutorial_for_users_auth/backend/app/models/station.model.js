module.exports = (sequelize, Sequelize) => {
   const Station = sequelize.define("stations", {
     station_id: {
       type: Sequelize.INTEGER,
       primaryKey: true
     },
     location: {
       type: Sequelize.STRING
     },
     company_name: {
       type: Sequelize.STRING
     },
     phone_number: {
       type: Sequelize.INTEGER
     },
     number_of_spaces: {
       type: Sequelize.INTEGER
     }
   },
      {
      tablename: 'Station',
      timestamps: false
   });
 
   return Station;
 };