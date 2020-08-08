"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../helpers/auth");
const hasher_1 = require("../helpers/hasher");
const user_model_1 = require("../models/user.model");
exports.userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqbody = req.body;
    let rst = yield user_model_1.UserModel.findByCredintials(reqbody.username);
    if (rst) {
        const valid = hasher_1.compaireHash(reqbody.password, rst[0].password);
        console.log(valid);
        const user = rst[0];
        const accessToken = yield auth_1.createAccessToken(user._id);
        const refreshToken = yield auth_1.createRefreshToken(user._id);
        user.refreshToken = refreshToken;
        console.log(user);
        user
            .save()
            .then(() => {
            auth_1.sendRefreshToken(res, refreshToken);
            auth_1.sendAccessToken(req, res, accessToken);
        })
            .catch((err) => {
            res.send("error on save" + err);
        });
    }
    else {
        next(new Error("user not found"));
    }
});
exports.userSingup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //get body username,email,password
    const body = req.body;
    //check existance
    let user = yield user_model_1.UserModel.findByCredintials(body.username);
    console.log(user);
    if (user.length == 0 || user.length == undefined) {
        console.log("no user found");
        //hash the password
        const hashPass = hasher_1.hashPassword(body.password);
        let newusr = new user_model_1.UserModel({
            username: body.username,
            email: body.email,
            password: hashPass,
        });
        //save new
        yield newusr.save().then(() => {
            res.json(newusr);
        });
        console.log(JSON.stringify(newusr));
    }
    else {
        next(new Error("user exists"));
    }
});
exports.UserLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("refreshToken", { path: "/" });
    return res.send({ message: "loged out" });
});
