"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class tournament_user extends Model {
    static associate(models) {
    }
  }

  tournament_user.init(
    {
      is_owner: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "tournament_user",
    },
  );

  return tournament_user;
};