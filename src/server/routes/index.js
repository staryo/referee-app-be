const Router = require("express")
const router = new Router()

const authRouter = require("./authRouter")
const userRouter = require("./userRouter")
const tournamentRouter = require("./tournamentRouter")

const {
  AUTH, USER, TOURNAMENT
} = require("./consts");

router.use(AUTH, authRouter)
router.use(USER, userRouter)
router.use(TOURNAMENT, tournamentRouter)

module.exports = router