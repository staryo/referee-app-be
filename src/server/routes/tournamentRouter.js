const Router = require("express")
const router = new Router()
const tournamentService = require("../services/tournamenService")

const validateRequestMiddleware = require("../middleware/validateRequestMiddleware")
const authMiddleware = require("../middleware/authMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")

const {
  CREATE, UPDATE, DATA, DELETE, GET_ALL, GET_PLAYER,
} = require("./consts");

// --- /api/tournament/create [POST] --- //
router.post(CREATE,
  validateRequestMiddleware({
    type: "object",
    properties: {
      name: { type: "string" },
      sport_name: { type: "string", minLength: 2 },
      default_number_of_periods: { type: "integer", minLength: 1 },
      default_periods_duration: { type: "integer" , minLength: 1},
      
    },
    required: ["name", "sport_name", "default_number_of_periods", "default_periods_duration"],
  }),
  tournamentService.create,
)

// --- /api/user/update/:id [PUT] --- //
router.put(`${UPDATE}/:id`,
  authMiddleware,
  validateRequestMiddleware({
    type: "object",
    properties: {
      
      name: { type: "string", minLength: 2 },
      sport_name: { type: "string", minLength: 2 },
      
    },
    required: [],
  }),
  tournamentService.update,
)

// --- /api/tournament/get_all [GET] --- //
router.get(GET_ALL,
  authMiddleware,
  tournamentService.get_all,
)

// --- /api/tournament/data/:id [GET] --- //
router.get(`${DATA}/:id`,
  authMiddleware,
  tournamentService.data,
)
// --- /api/tournament/:id/player [GET] --- //
router.get_player(`/:id/${GET_PLAYER}`,
  authMiddleware,
  tournamentService.player_data,
)
// --- /api/tournament/:id/match [GET] --- //
router.get_match(`/:id/${GET_PLAYER}`,
  authMiddleware,
  tournamentService.match_data,
)
// --- /api/tournament/delete/:id [DELETE] --- //
router.delete(`${DELETE}/:id`,
  authMiddleware,
  adminMiddleware,
  tournamentService.delete,
)


module.exports = router