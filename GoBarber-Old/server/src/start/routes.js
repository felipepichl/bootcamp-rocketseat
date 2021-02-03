import { Router } from 'express';

/**
 * Controllers
 */

/**
 * Exemple
 * import SessionController from '../app/controllers/SessionController';
 */

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

/**
 * Exemple
 * routes.post('/sessions', SessionController.store);
 */

export default routes;
