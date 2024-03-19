const Router = require("express")
const router = new Router()
const teamService = require("../services/teamService")

const validateRequestMiddleware = require("../middleware/validateRequestMiddleware")
const authMiddleware = require("../middleware/authMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")

const {
  CREATE, UPDATE, DATA, DELETE,
} = require("./consts");

// --- /api/team/create [POST] --- //
router.post(CREATE,
  authMiddleware,
  validateRequestMiddleware({
    type: "object",
    properties: {
      team_name: { type: "string", minLength: 2 },
      tournament_id: { type: "number" },
    },
    required: ["team_name", "tournament_id"],
  }),
  teamService.create,
)

// --- /api/team/update/:id [PUT] --- //
router.put(`${UPDATE}/:id`,
  authMiddleware,
  validateRequestMiddleware({
    type: "object",
    properties: {
      team_name: { type: "string", minLength: 2 },
    },
    required: [],
  }),
  teamService.update,
)

// --- /api/team/data/:id [GET] --- //
router.get(`${DATA}/:id`,
  authMiddleware,
  teamService.data,
)

// --- /api/team/delete/:id [DELETE] --- //
router.delete(`${DELETE}/:id`,
  authMiddleware,
  adminMiddleware,
  teamService.delete,
)


module.exports = router