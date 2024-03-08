"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class event_player extends Model {
    static associate(models) {
    }
  }

  event_player.init(
    {
      is_author: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "event_player",
    },
  );

  return event_player;
};