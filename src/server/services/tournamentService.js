const { db } = require("../../database/models")
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");
const Tournament = db.tournament
const Player = db.player
const Match = db.match
const User = db.user

class tournamentService {
  async create(req, res, next) {
    try {
      const tournament_data = req.body
      console.log(req.user)
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
      })
      const tournament = await Tournament.create(tournament_data)
      await tournament.addUser(user, { through: { is_owner: true } })

      return res.json(tournament)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params
      const user = req.user
      const tournament_data = req.body
      const tournament = await Tournament.findOne({
        where: {
          id,
        },
        include: {
          User,
          through: { where: { is_owner: true } },
        },
      });
      console.log(tournament)
      if (tournament.users[0].userId !== user.id && !user.is_admin) {
        return res.status(400).json({
          error: "You are not owner of this tournament, and you are not able to change data",
        })
      }
      return res.json(
        await tournament.update(tournament_data),
      )
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async data(req, res, next) {
    try {
      const { id } = req.params
      const tournament = await Tournament.findOne({
        where: {
          id,
        },
        include: [
          {
            model: User,
            where: {
              id: req.user.id,
            },
          },
          {
            model: Match,
          },
          {
            model: Player,
          },
        ],
      })
      return res.json(tournament)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async player_data(req, res, next) {
    try {
      const { id } = req.params
      const player = req.query;
      const tournament = await Tournament.findMany({
        where: {
          id: id,
        },
        include: [{
          model: Player,
          where: {
            last_name: {
              [Op.like]: `%${player}%`,
            },
          },
        }],
      })


      return res.json(tournament)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async match_data(req, res, next) {
    try {
      const { id } = req.params
      const match = req.query;
      const matches = await Tournament.findMany({
        where: {
          id: id,
        },
        include: [{
          model: Match,
          where: {
            name: {
              [Op.like]: `%${match}%`,
            },
          },
        }],
      })


      return res.json(matches)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async get_all(req, res, next) {
    try {
      const tournament = await Tournament.findAll({
        include: {
          model: User,
          where: {
            id: req.user.id,
          },
        },
        order: [
          ["createdAt", "DESC"],
        ],
      })
      return res.json(
        tournament.filter((row) => row.users.length > 0),
      )
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      return res.json(await Tournament.destroy({
        where: {
          id,
        },
      }))
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

}

module.exports = new tournamentService()