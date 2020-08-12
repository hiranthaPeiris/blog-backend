"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRound = 10;
exports.hashPassword = (password) => {
    const saltRounds = bcryptjs_1.default.genSaltSync(saltRound);
    return bcryptjs_1.default.hashSync(password, saltRounds);
};
exports.compaireHash = (string, hash) => {
    return bcryptjs_1.default.compareSync(string, hash);
};
