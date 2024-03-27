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
            as: "team1",
          },
          {
            model: Team,
            as: "team2",
          },
          {
            model: Event,
            include: {
              model: Player
            }
          },
        ],
      })
      const team1count = match.events.filter(row => row.team_number === 1).length
      const team2count = match.events.filter(row => row.team_number === 2).length
      return res.json({ match, team1count, team2count })
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

  async start(req, res, next) {
    try {
      const { id } = req.params

      const match = await Match.findOne({
        where: {
          id,
        },
      });

      if (match.is_period_completed || match.current_period === 0) {
        match.current_period += 1
        match.is_period_completed = false
        match.start_time = new Date()
        return res.json(
          await match.save(),
        )
      } else {
        match.start_time = new Date()
        return res.json(
          await match.save(),
        )
      }
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async finish(req, res, next) {
    try {
      const { id } = req.params

      const match = await Match.findOne({
        where: {
          id,
        },
      });

      if (!match.is_period_completed) {
        match.is_period_completed = true
        match.start_time = undefined
        return res.json(
          await match.save(),
        )
      } else {
        return res.json()
      }
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new matchService()