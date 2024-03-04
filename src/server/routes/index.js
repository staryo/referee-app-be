const Router = require("express")
const router = new Router()

const authRouter = require("./authRouter")
const userRouter = require("./userRouter")

const {
  AUTH, USER,
} = require("./consts");

router.use(AUTH, authRouter)
router.use(USER, userRouter)

module.exports = router