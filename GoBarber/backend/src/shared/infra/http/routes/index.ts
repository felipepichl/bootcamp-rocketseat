import { Router } from 'express';

/**
 * Routes
 */
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

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
