import { Request,Response } from "express";
import { sign } from "jsonwebtoken";

export const createAccessToken = (userID: string) => {
  return new Promise((resolve, reject) => {
    const accestoken = sign(
      { userID },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "10m",
      },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
};

export const createRefreshToken = (userID: string) => {
  return new Promise((resolve, reject) => {
    sign(
      { userID },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "7d",
      },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
};

export const sendAccessToken= (req:Request, res:Response, accestoken:string) => {
  res.send({
    accestoken,
    email: req.body.email,
  });
};

export const sendRefreshToken = (res:Response, refreshToken: string) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
  });
};
