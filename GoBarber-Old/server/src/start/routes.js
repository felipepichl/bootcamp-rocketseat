import { Router } from 'express';

/**
 * Controllers
 */

import UserController from '../app/controllers/UserController';

const routes = new Router();

/**
 * Exemple Route for test, you should remove this code snippet.
 */
routes.get('/', (req, res) => {
  return res.json({ message: 'hello world' });
});
/**
 * The message "hello word" should be see in your browser.
 */

/**
 * Routes
 */

routes.post('/users', UserController.store);

export default routes;
