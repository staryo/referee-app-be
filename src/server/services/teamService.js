const { db } = require("../../database/models");
const ApiError = require("../error/ApiError");
const Tournament = db.tournament
const Team = db.team

class teamService {
  async create(req, res, next) {
    try {
      const team_data = req.body
      const tournament = await Tournament.findOne({
        where: {
          id: req.body.tournament_id,
        },
      })
      const team = await Team.create(team_data)
      await tournament.addTeam(team)

      return res.json(team)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params

      const team_data = req.body
      const team = Team.findOne({
        where: {
          id,
        },
      });

      return res.json(
        await team.update(team_data),
      )
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async data(req, res, next) {
    try {
      const { id } = req.params
      const team = await Team.findOne({
        where: {
          id,
        },
        include: {
          Tournament,
        },
      })
      return res.json(team)
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

module.exports = new teamService()