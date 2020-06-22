import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotpasswordController = new ForgotPasswordController();
const resetpasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotpasswordController.create);
passwordRouter.post('/reset', resetpasswordController.create);

export default passwordRouter;
