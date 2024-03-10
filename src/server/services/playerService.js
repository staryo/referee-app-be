const { db } = require("../../database/models");
const tournament = require("../../database/models/tournament");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");
const Tournament = db.tournament
const Player = db.player
const Match = db.match
const User = db.user

class playerService {
  async create(req, res, next) {
    try {
      const player_data = req.body
      console.log(req.user)
      const player_id = await Tournament.findOne({
        where: {
          id: req.tournament.id,
        },
      })
      const player = await Player.create(player_data)
      await player.addUser(player_id)

      return res.json(player)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params
    
      const player_data = req.body
      const  player= Player.findOne({
        where: {
            id,
          },
          include: {
            Tournament,
            where: {
              id: req.tournament.id,
            },
          },
       
      });
      console.log(player)
    
      return res.json(
        await player.update(player_data),
      )
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async data(req, res, next) {
    try {
      const { id } = req.params
      const player = await Player.findMany({
        where: {
          id,
        },
        include: {
          Tournament,
          where: {
            id: req.tournament.id,
          },
        },
      })
      return res.json(player)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }



  async delete(req, res, next) {
    try {
      const { id } = req.params
      return res.json(await Player.destroy({
        where: {
          id,
        },
      }))
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

}

module.exports = new playerService()