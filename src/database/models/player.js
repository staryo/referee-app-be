"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class player extends Model {
    static associate(models) {
      player.belongsTo(models.tournament); // Adds tournamentId to Player
      player.belongsToMany(models.event, { through: 'event_player' }); // Adds eventId to Player
      player.belongsToMany(models.match, {through: "match_player"})
    }
  }

  player.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "player",
    },
  );

  return player;
};