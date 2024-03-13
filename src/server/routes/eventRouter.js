const Router = require("express")
const router = new Router()
const eventService = require("../services/eventService")

const validateRequestMiddleware = require("../middleware/validateRequestMiddleware")
const authMiddleware = require("../middleware/authMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")

const {
  CREATE, UPDATE, DELETE,
} = require("./consts");

// --- /api/event/create [POST] --- //
router.post(CREATE,
  authMiddleware,
  validateRequestMiddleware({
    type: "object",
    properties: {
      goal_author_id: { type: "number" },
      match_id: { type: "number" },
      time: { type: "number" },
      period: { type: "number" },
      team_number: { type: "number" },
      assist_author_id: { type: "number" }, // for one assistant it's okay
    },
    required: ["goal_author_id", "match_id", "time", "period", "team_number", "assist_author_id"],
  }),
  eventService.create,
)

// --- /api/event/update/:id [PUT] --- //
router.put(`${UPDATE}/:id`,
  authMiddleware,
  validateRequestMiddleware({
    type: "object",
    properties: {
      goal_author_id: { type: "number" },
      match_id: { type: "number" },
      time: { type: "number" },
      period: { type: "number" },
      team_number: { type: "number" },
      assist_author_id: { type: "number" },
    },
    required: [],
  }),
  eventService.update,
)

// --- /api/event/delete/:id [DELETE] --- //
router.delete(`${DELETE}/:id`,
  authMiddleware,
  adminMiddleware,
  eventService.delete,
)


module.exports = router