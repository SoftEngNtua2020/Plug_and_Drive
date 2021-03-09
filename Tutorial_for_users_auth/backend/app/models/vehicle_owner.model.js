module.exports = (sequelize, Sequelize) => {
  const Owner = sequelize.define("vehicle_owner", {
    owner_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone_Number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birth_date: {
      type: Sequelize.DATEONLY,
      allowNull: false, 
    },
    bonus_points: {
      type: Sequelize.INTEGER,
      allowNull: false, 
      defaultValue: 0
    }
  },
  {
      tableName: 'vehicle_owner',
      timestamps: false
  });

  return Owner;
};