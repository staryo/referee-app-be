const { db } = require("../../database/models");
const ApiError = require("../error/ApiError");
const Team = db.team
const Player = db.player

class playerService {
  async create(req, res, next) {
    try {
      const player_data = req.body
      const team = await Team.findOne({
        where: {
          id: req.body.team_id,
        },
      })
      const player = await Player.create(player_data)
      await team.addPlayer(player)

      return res.json(player)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params

      const player_data = req.body
      const player = Player.findOne({
        where: {
          id,
        },
      });

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
      const player = await Player.findOne({
        where: {
          id,
        },
        include: {
          Team,
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