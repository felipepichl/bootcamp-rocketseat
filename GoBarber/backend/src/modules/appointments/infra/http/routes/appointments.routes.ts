import { Router } from 'express';

import ensureAuthentocated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthentocated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
