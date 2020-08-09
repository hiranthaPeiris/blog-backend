import { NextFunction, Request, Response } from "express";
import { isAuth } from "../helpers/auth";
import { UserModel } from "../models/user.model";

export const checkAuthHeader = (required: boolean = true) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //checking access token header
      const accessTokenHeader = req.headers.authorization as string;
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
      const accessID = isAuth(accessToken) as { userID: string };
      const user = await UserModel.findByUserId(accessID.userID);

      //Seting on locals
      res.locals.accessToken = accessToken;
      res.locals.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };
};
