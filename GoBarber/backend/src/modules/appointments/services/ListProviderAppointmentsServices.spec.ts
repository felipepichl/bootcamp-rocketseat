// import AppError from '@shared/errors/AppError';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsServices from './ListProviderAppointmentsServices';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderAppointments: ListProviderAppointmentsServices;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();

    listProviderAppointments = new ListProviderAppointmentsServices(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    // jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    //   return new Date(2020, 4, 20, 11).getTime();
    // });

    const appointment = await listProviderAppointments.execute({
      provider_id: 'provider',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointment).toEqual([appointment1, appointment2]);
  });
});
