module.exports = (sequelize, Sequelize) => {
    const Point = sequelize.define("point", {
      point_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      }
    },
    {
      tableName: 'point',
      timestamps: false
    });
  
    return Point;
  };
 
