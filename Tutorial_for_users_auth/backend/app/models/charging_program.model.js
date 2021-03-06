module.exports = (sequelize, Sequelize) => {
  const Charging_Program = sequelize.define("charging_program", {
    program_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    program_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    kwh_price: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    bonus_per_kwh: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
  },
  {
      tableName: 'charging_program',
      timestamps: false
  });

  return Charging_Program;
};