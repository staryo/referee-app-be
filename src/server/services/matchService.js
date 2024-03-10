const { db } = require("../../database/models");
const ApiError = require("../error/ApiError");
const Tournament = db.tournament
const Team = db.team
const Match = db.match
const Player = db.player
const Event = db.event

class matchService {
  async create(req, res, next) {
    try {
      const match_data = req.body
      const tournament = await Tournament.findOne({
        where: {
          id: req.body.tournament_id,
        },
      })
      const team1 = await Team.findOne({
        where: {
          id: req.body.team1_id,
        },
      })
      const team2 = await Team.findOne({
        where: {
          id: req.body.team2_id,
        },
      })
      match_data.team1Id = team1.id
      match_data.team2Id = team2.id
      const match = await Match.create(match_data)
      await tournament.addMatch(match)

      return res.json(match)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params

      const match_data = req.body
      const match = Match.findOne({
        where: {
          id,
        },
      });

      return res.json(
        await match.update(match_data),
      )
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async data(req, res, next) {
    try {
      const { id } = req.params
      const match = await Match.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Tournament,
          },
          {
            model: Team,
            as: "team1"
          },
          {
            model: Team,
            as: "team2"
          },
          {
            model: Player,
          },
          {
            model: Event,
          },
        ],
      })
      return res.json(match)
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

module.exports = new matchService()