const { db } = require("../../database/models")
const ApiError = require("../error/ApiError");
const { Op } = require('sequelize');
const Tournament = db.tournament
const User=db.user
const Player=db.player
const Match=db.match
class tournamentService {
  async create(req, res, next) {
    try {
      const tournament_data = req.body

      const tournament = await Tournament.create(tournament_data)

      return res.json(tournament)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params
      const tournament_data = req.body
      const tournament = Tournament.findOne({
        where: {
          owner_id,
        },
      });


      const candidate = await User.findOne({
        where: {
          tournment_user,
        },
      });
      if (tournament.id !== candidate) {
        return res.status(400).json({ error: "You are not owner of this tournament, and you don't be able to change data" })
      }
      if (tournament.id == candidate) {
        tournament.update(tournament_data)
      }
      return res.json()
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
              [Op.like]: `%${player}%`
            }
          }
        }]
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
            where:{
              name: {
                [Op.like]: `%${match}%`
              }
            }
          }]
        })   
    
    
      return res.json(matches)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async get_all(req, res, next) {
    try {
      const tournament = await Tournament.findAll()
      return res.json(tournament)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      const tournament = Tournament.destroy({
        where: {
          id,
        },
      })
      return res.json(tournament)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

}

module.exports = new tournamentService()