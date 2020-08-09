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
const post_model_1 = require("../models/post.model");
exports.getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.postModel.find();
        if (posts) {
            res.status(200).send(posts);
        }
        else {
            res.status(404).send({ error: "Notes not found" });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postBody = req.body;
    const newPost = new post_model_1.postModel(postBody);
    try {
        yield newPost.save();
        res.status(200).send({ message: "Post Created" });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getPostBySlug = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.postModel.findOne({ slug: req.params.slug });
        res.status(200).send(post);
    }
    catch (err) {
        res.status(404).send(err);
    }
});
//   PostCtrl.updatePost = async (req, res) => {
//     const { image, title, description, markdown } = req.body;
//     try {
//       await Post.findOneAndUpdate(
//         { _id: req.params.id },
//         { image, title, description, markdown }
//       );
//       res.status(200).send({ message: "Post update successfully" });
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   };
//   PostCtrl.deletePost = async (req, res) => {
//     try {
//       await Post.findOneAndDelete({ _id: req.params.id });
//       res.status(200).send({ message: "Post deleted successfully" });
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   };
