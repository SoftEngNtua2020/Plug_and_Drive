module.exports = (sequelize, Sequelize) => {
    const Energy_Provider = sequelize.define("energy_provider", {
      provider_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      provider_name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
        tableName: 'energy_provider',
        timestamps: false
    });
  
    return Energy_Provider;
  };