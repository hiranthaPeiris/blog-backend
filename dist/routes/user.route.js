"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.Router();
//user routes
router.post('/login', user_controller_1.userLogin);
router.post('/logout', user_controller_1.UserLogout);
router.post('/signup', user_controller_1.userSingup);
router.get('/users');
exports.default = router;
