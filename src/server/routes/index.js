const Router = require("express")
const router = new Router()

const authRouter = require("./authRouter")
const userRouter = require("./userRouter")
const tournamentRouter = require("./tournamentRouter")
const playerRouter = require("./playerRouter")
const teamRouter = require("./teamRouter")
const matchRouter = require("./matchRouter")
const eventRouter = require("./eventRouter")

const {
  AUTH, USER, TOURNAMENT, PLAYER, TEAM, MATCH, EVENT
} = require("./consts");

router.use(AUTH, authRouter)
router.use(USER, userRouter)
router.use(TOURNAMENT, tournamentRouter)
router.use(PLAYER, playerRouter)
router.use(TEAM, teamRouter)
router.use(MATCH, matchRouter)
router.use(EVENT, eventRouter)

module.exports = router