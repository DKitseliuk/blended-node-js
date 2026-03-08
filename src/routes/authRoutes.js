import { Router } from 'express';
import { celebrate } from 'celebrate';
import { loginSchema, registerSchema } from '../validators/authValidators.js';
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
} from '../controllers/authControllers.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  celebrate(registerSchema, { abortEarly: false }),
  registerController,
);

authRouter.post(
  '/auth/login',
  celebrate(loginSchema, { abortEarly: false }),
  loginController,
);

authRouter.post('/auth/logout', logoutController);

authRouter.post('/auth/refresh', refreshController);

export default authRouter;
