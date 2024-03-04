const ApiError = require("../error/ApiError");
const { verify } = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    if (!("token" in req.cookies)) {
      return res.status(403).json({ "error": "Authorization error" })
    }
    const token = req.cookies.token

    if (!token) {
      return next(ApiError.internal("no token in cookies"))
    }

    req.user = verify(token, process.env.SECRET_KEY || "secret_key")
    next()
  } catch (e) {
    next(ApiError.unauthorized(e))
  }
}