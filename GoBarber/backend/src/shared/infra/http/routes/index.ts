import { Router } from 'express';

/**
 * Routes
 */
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

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
 * Providers
 */
routes.use('/providers', providersRouter);

/**
 * Users
 */
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
