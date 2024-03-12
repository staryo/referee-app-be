const { db } = require("../../database/models");
const ApiError = require("../error/ApiError");
const Match = db.match
const Player = db.player
const Event=db.event

class eventService {
  async create(req, res, next) {
    try {
      const event_data = req.body
      const match = await Match.findOne({
        where: {
          id: req.body.match_id,
        },
      })
      const event = await Event.create(event_data)
      await match.addPlayer(event)

      return res.json(event)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params

      const event_data = req.body
      const event = Event.findOne({
        where: {
          id,
        },
      });

      return res.json(
        await event.update(event_data),
      )
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

//   async data(req, res, next) {
//     try {
//       const { id } = req.params
//       const player = await Player.findOne({
//         where: {
//           id,
//         },
//         include: {
//           Tournament,
//         },
//       })
//       return res.json(player)
//     } catch (e) {
//       next(ApiError.badRequest(e.message))
//     }
//   }


  async delete(req, res, next) {
    try {
      const { id } = req.params
      return res.json(await Event.destroy({
        where: {
          id,
        },
      }))
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

}

module.exports = new eventService()