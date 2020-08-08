import { getClassForDocument } from "@typegoose/typegoose";
import { RequestHandler } from "express";
import {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} from "../helpers/auth";
import { compaireHash, hashPassword } from "../helpers/hasher";
import { UserLoginInter, UserSignupInter } from "../helpers/user.interface";
import { UserModel } from "../models/user.model";

export const userLogin: RequestHandler = async (req, res, next) => {
  const reqbody = req.body as UserLoginInter;
  let rst = await UserModel.findByCredintials(reqbody.username);

  if (rst) {
    const valid = compaireHash(reqbody.password, rst[0].password!);
    console.log(valid);
    const user = rst[0];
    const accessToken = await createAccessToken(user._id);
    const refreshToken = await createRefreshToken(user._id);

    user.refreshToken = refreshToken as string;
    console.log(user);
    user
      .save()
      .then(() => {
        sendRefreshToken(res, refreshToken as string);
        sendAccessToken(req, res, accessToken as string);
      })
      .catch((err) => {
        res.send("error on save" + err);
      });
  } else {
    next(new Error("user not found"));
  }
};

export const userSingup: RequestHandler = async (req, res, next) => {
  //get body username,email,password
  const body = req.body as UserSignupInter;
  //check existance
  let user = await UserModel.findByCredintials(body.username);
  console.log(user);

  if (user.length == 0 || user.length == undefined) {
    console.log("no user found");
    //hash the password
    const hashPass = hashPassword(body.password);

    let newusr = new UserModel({
      username: body.username,
      email: body.email,
      password: hashPass,
    });
    //save new

    await newusr.save().then(() => {
      res.json(newusr);
    });
    console.log(JSON.stringify(newusr));
  } else {
    next(new Error("user exists"));
  }
};

export const UserLogout: RequestHandler = async (req, res, next) => {
  res.clearCookie("refreshToken", { path: "/" });
  return res.send({ message: "loged out" });
};
