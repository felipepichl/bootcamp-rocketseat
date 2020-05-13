import { Router } from 'express';

/**
 * Routes
 */
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

/**
 * Session
 */
routes.use('/sessions', sessionsRouter);

/**
 * Appointments
 */
routes.use('/appointments', appointmentsRouter);

/**
 * Users
 */
routes.use('/users', usersRouter);

export default routes;
