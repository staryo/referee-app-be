const Router = require("express")
const router = new Router()
const userService = require("../services/userService")

const validateRequestMiddleware = require("../middleware/validateRequestMiddleware")
const authMiddleware = require("../middleware/authMiddleware")

const {
  CREATE, UPDATE, DATA, DELETE,
} = require("./consts");

// --- /api/user/create [POST] --- //
router.post(CREATE,
  // authMiddleware,
  validateRequestMiddleware({
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      first_name: { type: "string", minLength: 2 },
      last_name: { type: "string", minLength: 2 },
      phone: { type: "string", minLength: 2 },
      password: { type: "string", minLength: 8 },
      passwordRepeated: { type: "string", minLength: 8 },
    },
    required: ["email", "first_name", "last_name", "phone", "password", "passwordRepeated"],
  }),
  userService.create,
)

// --- /api/user/create [PUT] --- //
router.put(`${UPDATE}/:id`,
  // authMiddleware,
  validateRequestMiddleware({
    type: "object",
    properties: {
      email: { type: "string" },
      name: { type: "string", minLength: 2 },
      lastname: { type: "string", minLength: 2 },
      password: { type: "string", minLength: 8 },
      passwordRepeated: { type: "string", minLength: 8 },
      phone: { type: "string", minLength: 6 },
    },
    required: [],
  }),
  userService.update,
)

// --- /api/user/data [GET] --- //
router.get(DATA,
  // authMiddleware,
  userService.data,
)

// --- /api/user/delete [DELETE] --- //
router.delete(`${DELETE}/:id`,
  // authMiddleware,
  userService.delete,
)

module.exports = router