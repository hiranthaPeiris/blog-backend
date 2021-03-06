"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const checkAuthHeader_1 = require("../middleware/checkAuthHeader");
const route = express_1.Router();
//user only
route.post("/create", checkAuthHeader_1.checkAuthHeader(), post_controller_1.createPost);
route.put('/update', checkAuthHeader_1.checkAuthHeader());
route.delete('/delete', checkAuthHeader_1.checkAuthHeader());
//general
route.get("/", post_controller_1.getPosts);
route.get("/:slug", post_controller_1.getPostBySlug);
exports.default = route;
