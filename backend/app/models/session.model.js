module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define("Charging_Session", {
      session_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      started_on: {
        type: Sequelize.DATE,
        allowNull: false
      },
      finished_on: {
        type: Sequelize.DATE,
        allowNull: false
      },
      energy_deliverd: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      point_id: {
        type: Sequelize.INTEGER,
        allowNull: false, 
      },
      protocol: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      payment_method: {
        type: Sequelize.ENUM('CASH', 'CREDIT_CARD'),
        allowNull: false, 
      },
      bonus_points_energy: {
        type: Sequelize.INTEGER,
        allowNull: false, 
      },
      total_cost: {
        type: Sequelize.DOUBLE,
        allowNull: false, 
      }
    },
    {
        tableName: 'Charging_Session',
        timestamps: false
    });
  
    return Session;
  };