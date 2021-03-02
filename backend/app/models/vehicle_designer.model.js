module.exports = (sequelize, Sequelize) => {
    const Vehicle_designer = sequelize.define("designer", {
      designer_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      designer_name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
      {
       tablename: 'Vehicle_designer',
       timestamps: false
      }
    );
  
    return Vehicle_designer;
  };
 