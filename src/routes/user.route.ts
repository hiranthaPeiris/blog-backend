import { Router } from "express";
import {userLogin, UserLogout, userSingup} from '../controllers/user.controller';

const router = Router();

//user routes
router.post('/login',userLogin);
router.post('/logout',UserLogout);
router.post('/signup',userSingup);
router.get('/users');

export default router;