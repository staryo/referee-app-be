const { db } = require("../../database/models")
const ApiError = require("../error/ApiError");
const User = db.user
const bcrypt = require("bcryptjs")
const { makeCookieResponse } = require("./util/authUtil");

class authService {
  async login(req, res, next) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({
        where: {
          email: email,
        },
      })
      if (!user) {
        return res.status(401).json({ error: "No such email" })
      }
      if (password === "") {
        return res.status(401).json({ error: "Empty password is impossible" })
      }

      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) {
        return res.status(401).json({ error: "Wrong password provided" })
      }
      user.password = "isHidden"
      makeCookieResponse(user, res)
      return res.json(user)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async checkStatus(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
      })
      user.password = "isHidden"
      return res.json(user)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async logout(req, res, next) {
    try {
      try {
        res.clearCookie("token");
      } catch (e) {
        console.log(e)
      }
      res.clearCookie();
      return res.json("cookies eaten")
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new authService()