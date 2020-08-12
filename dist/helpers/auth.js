"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
exports.createAccessToken = (userID) => {
    return new Promise((resolve, reject) => {
        const accestoken = jsonwebtoken_1.sign({ userID }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "10m",
        }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
};
exports.createRefreshToken = (userID) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.sign({ userID }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "7d",
        }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
};
exports.sendAccessToken = (req, res, accestoken) => {
    res.send({
        accestoken,
        email: req.body.email,
    });
};
exports.sendRefreshToken = (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
    });
};
exports.isAuth = (accessToken) => {
    return jsonwebtoken_1.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
};
