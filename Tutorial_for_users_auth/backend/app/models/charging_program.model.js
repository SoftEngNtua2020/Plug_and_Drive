module.exports = (sequelize, Sequelize) => {
    const Charging_Program = sequelize.define("Charging_Program", {
      program_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      kwh_price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      bonus_per_kwh: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
    },
    {
        tableName: 'Charging_Program',
        timestamps: false
    });
  
    return Charging_Program;
  };