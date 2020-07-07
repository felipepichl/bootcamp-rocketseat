import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  year: number;
  month: number;
}

@injectable()
class ListProviderAppointmentsServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    year,
    month,
  }: IRequest): Promise<Appointment[]> {
    const chaceData = await this.cacheProvider.recovery('asd');

    console.log(chaceData);

    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        year,
        month,
      },
    );

    // await this.cacheProvider.save('asd', 'asd');

    return appointments;
  }
}

export default ListProviderAppointmentsServices;
