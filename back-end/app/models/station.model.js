module.exports = (sequelize, Sequelize) => {
  const Station = sequelize.define("stations", {
    station_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false
    },
    company_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone_number: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
     {
     tablename: 'Station',
     timestamps: false
  });

  return Station;
};