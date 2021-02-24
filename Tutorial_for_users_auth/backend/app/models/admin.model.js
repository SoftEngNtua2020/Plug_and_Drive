module.exports = (sequelize, Sequelize) => {
   const Admin = sequelize.define("admin", {
     admin_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
     },
     first_name: {
       type: Sequelize.STRING
     },
     last_name: {
       type: Sequelize.STRING
     }
   },
     {
      tablename: 'Admin',
      timestamps: false
     }
   );
 
   return Admin;
 };