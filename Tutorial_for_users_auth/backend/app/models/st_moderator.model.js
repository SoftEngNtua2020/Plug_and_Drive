module.exports = (sequelize, Sequelize) => {
    const Station_Moderator = sequelize.define("station_moderator", {
      st_moderator_id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
      {
       tablename: 'station_admin',
       timestamps: false
      }
    );
  
    return Station_Moderator;
  };