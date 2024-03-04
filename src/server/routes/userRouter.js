const Router = require("express")
const router = new Router()
const userService = require("../services/userService")

const validateRequestMiddleware = require("../middleware/validateRequestMiddleware")
const authMiddleware = require("../middleware/authMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")

const {
  CREATE, UPDATE, DATA, DELETE, GET_ALL,
} = require("./consts");

// --- /api/user/create [POST] --- //
router.post(CREATE,
  validateRequestMiddleware({
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      first_name: { type: "string", minLength: 2 },
      last_name: { type: "string", minLength: 2 },
      password: { type: "string", minLength: 8 },
      repeat_password: { type: "string", minLength: 8 },
    },
    required: ["email", "first_name", "last_name", "password", "repeat_password"],
  }),
  userService.create,
)

// --- /api/user/update/:id [PUT] --- //
router.put(`${UPDATE}/:id`,
  authMiddleware,
  validateRequestMiddleware({
    type: "object",
    properties: {
      email: { type: "string" },
      name: { type: "string", minLength: 2 },
      lastname: { type: "string", minLength: 2 },
      password: { type: "string", minLength: 8 },
      passwordRepeated: { type: "string", minLength: 8 },
      phone: { type: "string", minLength: 6 },
      is_admin: {type: "boolean"}
    },
    required: [],
  }),
  userService.update,
)

// --- /api/user/get_all [GET] --- //
router.get(GET_ALL,
  authMiddleware,
  userService.get_all,
)

// --- /api/user/data/:id [GET] --- //
router.get(`${DATA}/:id`,
  authMiddleware,
  userService.data,
)

// --- /api/user/delete/:id [DELETE] --- //
router.delete(`${DELETE}/:id`,
  authMiddleware,
  adminMiddleware,
  userService.delete,
)

module.exports = router