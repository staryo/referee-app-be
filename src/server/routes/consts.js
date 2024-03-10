// --- server api --- //
const API = "/api"

// --- models api --- //
const AUTH = "/auth"
const USER = "/user"
const TOURNAMENT = "/tournament"
const PLAYER = "/player"
const TEAM = "/team"
const MATCH = "/match"

// --- methods api --- //
const SIGNUP = "/signup"
const LOGIN = "/login"
const LOGOUT = "/logout"
const CREATE = "/create"
const DATA = "/data"
const DELETE = "/delete"
const UPDATE = "/update"
const GET_ALL = "/get_all"

module.exports = {
  API, USER, TOURNAMENT, PLAYER, TEAM, MATCH,
  AUTH, UPDATE,
  SIGNUP, LOGIN, LOGOUT,
  CREATE, DATA, DELETE, GET_ALL,
}