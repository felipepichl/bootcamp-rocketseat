import { Router } from 'express';

import ensureAuthentocated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthentocated);

providersRouter.get('/', providersController.index);

export default providersRouter;
