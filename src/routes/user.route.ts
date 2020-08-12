import { Router } from "express";
import {userLogin, UserLogout, userSingup} from '../controllers/user.controller';
import { checkAuthHeader } from "../middleware/checkAuthHeader";

const router = Router();

//user routes
router.post('/login',userLogin);
router.post('/logout',checkAuthHeader(),UserLogout);
router.post('/signup',userSingup);
router.get('/users');

export default router;