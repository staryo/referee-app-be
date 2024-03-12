const Router = require("express")
const router = new Router()
const matchService = require("../services/matchService")

const validateRequestMiddleware = require("../middleware/validateRequestMiddleware")
const authMiddleware = require("../middleware/authMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")

const {
  CREATE, UPDATE, DATA, DELETE,
} = require("./consts");

// --- /api/match/create [POST] --- //
router.post(CREATE,
  authMiddleware,
  validateRequestMiddleware({
    type: "object",
    properties: {
      name: { type: "string", minLength: 2 },
      team1_id: { type: "number" },
      team2_id: { type: "number" },
      tournament_id: { type: "number" }
    },
    required: ["name", "team1_id", "team2_id", "tournament_id"],
  }),
  matchService.create,
)

// --- /api/match/update/:id [PUT] --- //
router.put(`${UPDATE}/:id`,
  authMiddleware,
  validateRequestMiddleware({
    type: "object",
    properties: {
      first_name: { type: "string", minLength: 2 },
      last_name: { type: "string", minLength: 2 },
      description: { type: "string" },


    },
    required: [],
  }),
  matchService.update,
)

// --- /api/match/data/:id [GET] --- //
router.get(`${DATA}/:id`,
  authMiddleware,
  matchService.data,
)
// --- /api/match/count/:id [GET] --- //
router.get(`/api/match/count/:id`,
  authMiddleware,
  matchService.count,
)

// --- /api/match/delete/:id [DELETE] --- //
router.delete(`${DELETE}/:id`,
  authMiddleware,
  adminMiddleware,
  matchService.delete,
)


module.exports = router