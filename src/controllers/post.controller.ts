import { RequestHandler } from "express";
import { postInterface } from "../helpers/post.interface";
import { postModel } from "../models/post.model";

export const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const posts = await postModel.find();
    if (posts) {
      res.status(200).send(posts);
    } else {
      res.status(404).send({ error: "Notes not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createPost: RequestHandler = async (req, res, next) => {
  const postBody = req.body as postInterface;
  const newPost = new postModel(postBody);
  try {
    await newPost.save();
    res.status(200).send({ message: "Post Created" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getPostBySlug: RequestHandler = async (req, res, next) => {
  try {
    const post = await postModel.findOne({ slug: req.params.slug });
    res.status(200).send(post);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const  updatePost:RequestHandler = async (req, res) => {
    const postBody = req.body as postInterface;
    try {
      await postModel.findOneAndUpdate(
        { _id: req.params.id },
        postBody
      );
      res.status(200).send({ message: "Post update successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  };

export const deletePost:RequestHandler = async (req, res) => {
    try {
      await postModel.findOneAndDelete({ _id: req.params.id });
      res.status(200).send({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  };
