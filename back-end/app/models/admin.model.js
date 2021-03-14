module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define("admin", {
    admin_id: {
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
     tablename: 'Admin',
     timestamps: false
    }
  );

  return Admin;
};