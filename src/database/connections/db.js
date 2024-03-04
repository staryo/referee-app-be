const { Sequelize } = require("sequelize")
const config = require("../config/config.js");

module.exports = new Sequelize(
  config.db.url,
  {
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false, // This line will fix new error
      },
    },
  },
);