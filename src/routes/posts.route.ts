import { Router } from "express";
import {
  createPost,
  getPostBySlug,
  getPosts,
} from "../controllers/post.controller";
import { checkAuthHeader } from "../middleware/checkAuthHeader";

const route = Router();

route.post("/create", checkAuthHeader(), createPost);
route.get("/", getPosts);
route.get("/:slug", getPostBySlug);

export default route;
