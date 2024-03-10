const Router = require("express")
const router = new Router()

const authRouter = require("./authRouter")
const userRouter = require("./userRouter")
const tournamentRouter = require("./tournamentRouter")
const playerRouter = require("./playerRouter")
const teamRouter = require("./teamRouter")

const {
  AUTH, USER, TOURNAMENT, PLAYER, TEAM
} = require("./consts");

router.use(AUTH, authRouter)
router.use(USER, userRouter)
router.use(TOURNAMENT, tournamentRouter)
router.use(PLAYER, playerRouter)
router.use(TEAM, teamRouter)

module.exports = router