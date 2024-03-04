const jwt = require("jsonwebtoken");

const generateJwt = (id, email, name, role, lastname, schoolName) => {
    return jwt.sign(
        {id, email, name, role, lastname, schoolName},
        process.env.SECRET_KEY || 'secret_key',
        {expiresIn: '120h'}
    )
}

const makeCookieResponse = (user, res) => {
    const token = generateJwt(user.id, user.email, user.name, user.role, user.lastname, user.schoolName)

    res.cookie("token", token, {
        // httpOnly: true,
        secure: true, // true ?
        sameSite: "none",
        // domain : 'hackathon-db-965973f799e7.herokuapp.com',
        maxAge: 24 * 60 * 60 * 1000, // --- 24 hours --- //
        // signed: true
    });
}

module.exports = {
    generateJwt,
    makeCookieResponse
}