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
const user_model_1 = require("../models/user.model");
exports.checkAuthHeader = (required = true) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //checking access token header
            const accessTokenHeader = req.headers.authorization;
            if (!accessTokenHeader) {
                console.log("header not found");
                throw new Error("Header not found thrown");
            }
            // checking bearer
            if (!accessTokenHeader.startsWith("Bearer")) {
                console.log("header Bearer not found");
                throw new Error("Header Bearer not found thrown");
            }
            //Get user ID from access Token
            const accessToken = accessTokenHeader.substring("Bearer ".length);
            const accessID = auth_1.isAuth(accessToken);
            const user = yield user_model_1.UserModel.findByUserId(accessID.userID);
            //Seting on locals
            res.locals.accessToken = accessToken;
            res.locals.user = user;
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
