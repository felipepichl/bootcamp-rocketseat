import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotpasswordController = new ForgotPasswordController();
const resetpasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotpasswordController.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().min(6).required(),
      password_confirmation: Joi.string()
        .min(6)
        .required()
        .valid(Joi.ref('password')),
      token: Joi.string().uuid().required(),
    },
  }),
  resetpasswordController.create,
);

export default passwordRouter;
