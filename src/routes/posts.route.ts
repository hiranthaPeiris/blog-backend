import { Router } from "express";
import {
  createPost,
  getPostBySlug,
  getPosts,
} from "../controllers/post.controller";
import { checkAuthHeader } from "../middleware/checkAuthHeader";
import router from "./todos";

const route = Router();
//user only
route.post("/create", checkAuthHeader(), createPost);
route.put('/update',checkAuthHeader());
route.delete('/delete',checkAuthHeader());

//general
route.get("/", getPosts);
route.get("/:slug", getPostBySlug);

export default route;
