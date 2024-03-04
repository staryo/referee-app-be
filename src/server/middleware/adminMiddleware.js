const ApiError = require("../error/ApiError");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    if (!(req.user.is_admin)) {
      return res.status(403).json({ "error": "Forbidden" })
    }
    next()
  } catch (e) {
    next(ApiError.unauthorized(e))
  }
}