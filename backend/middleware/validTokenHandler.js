const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const functions = require("firebase-functions");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        // console.log("TOKEN ", token);
        jwt.verify(token, functions.config().app.access_token_secret, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not Authorized");
            }
            req.user = decoded.user;
            next();
        })

        if (!token) {
            res.status(401);
            throw new Error("User is not authorized or token is missing.")
        }
    }
});

module.exports = validateToken;