const Ajv = require("ajv");
const ApiError = require("../error/ApiError");

const addFormats = require("ajv-formats");
const ajv = new Ajv({
    allErrors: true,
    $data: true,
});
addFormats(ajv);

module.exports = function (schema) {
    return async function (req, res, next) {
        if (req.method === "OPTIONS") {
            return next();
        }

        try {
            const valid = ajv.validate(schema, req.body);

            if (!valid) {
                console.error("Validation errors:", ajv.errors);
                return res.status(400).json(ajv.errors);
            }

            next();
        } catch (e) {
            console.error("Request validation error:", e);
            next(ApiError.internal("Request validation error"));
        }
    };
};
