const Router = require("express")
const router = new Router()
const playerService = require("../services/playerService")

const validateRequestMiddleware = require("../middleware/validateRequestMiddleware")
const authMiddleware = require("../middleware/authMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")

const {
  CREATE, UPDATE, DATA, DELETE,
} = require("./consts");

// --- /api/player/create [POST] --- //
router.post(CREATE,
  authMiddleware,
  validateRequestMiddleware({
    type: "object",
    properties: {
      first_name: { type: "string", minLength: 2 },
      last_name: { type: "string", minLength: 2 },
      description: { type: "string" },
      team_id: { type: "number" },
    },
    required: ["first_name", "last_name", "description", "team_id"],
  }),
  playerService.create,
)

// --- /api/player/update/:id [PUT] --- //
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
  playerService.update,
)

// --- /api/player/data/:id [GET] --- //
router.get(`${DATA}/:id`,
  authMiddleware,
  playerService.data,
)

// --- /api/player/delete/:id [DELETE] --- //
router.delete(`${DELETE}/:id`,
  authMiddleware,
  adminMiddleware,
  playerService.delete,
)


module.exports = router