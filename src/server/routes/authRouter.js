const Router = require("express")
const router = new Router()
const authService = require("../services/authService")

const validateRequestMiddleware = require("../middleware/validateRequestMiddleware")
const authMiddleware = require("../middleware/authMiddleware")

const {
  LOGIN, LOGOUT,
} = require("./consts");

// --- /api/auth/login [POST] --- //
router.post(LOGIN,
  validateRequestMiddleware({
    type: "object",
    properties: {
      email: { type: "string" },
      password: { type: "string", minLength: 8 },
    },
    required: ["email", "password"],
  }),
  authService.login,
)

// --- /api/auth/logout [POST] --- //
router.post(LOGOUT,
  authMiddleware,
  authService.logout,
)

// --- /api/auth/login [GET] --- //
router.get(LOGIN,
  authMiddleware,
  authService.checkStatus,
)

module.exports = router