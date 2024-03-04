const { db } = require("../../database/models")
const ApiError = require("../error/ApiError");
const bcrypt = require("bcryptjs");
const User = db.user

class userService {
  async create(req, res, next) {
    try {
      const { email, password, passwordRepeated } = req.body

      if (password !== passwordRepeated) {
        return next(ApiError.badRequest("passwords do not match"))
      }

      const candidate = await User.findOne({
        where: {
          email: email,
        },
      });
      if (candidate) {
        return res.status(400).json({ error: "User already exists" })
      }

      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({ ...req.body, password: hashPassword, is_admin: false })

      return res.json(user)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params
      const user = User.findOne({
        where: {
          id,
        },
      });
      const { email, password, passwordRepeated } = req.body

      if (password) {
        if (password !== passwordRepeated) {
          return next(ApiError.badRequest("passwords do not match"))
        }
        req.body.password = await bcrypt.hash(password, 5)
      }

      if (email) {
        const candidate = await User.findOne({
          where: {
            email,
          },
        });
        if (candidate && candidate.id !== user.id) {
          return res.status(400).json({ error: "User with this email already exists" })
        }
      }
      user.update({ ...req.body })
      return res.json()
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async data(req, res, next) {
    try {
      const { id } = req.params
      const user = await User.findOne({
        where: {
          id,
        },
      })
      return res.json(user)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async get_all(req, res, next) {
    try {
      const users = await User.findAll()
      return res.json(users)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      const user = User.destroy({
        where: {
          id,
        },
      })
      return res.json(user)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

}

module.exports = new userService()