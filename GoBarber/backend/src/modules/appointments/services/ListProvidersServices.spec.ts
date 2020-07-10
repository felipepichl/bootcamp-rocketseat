// import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersServices from './ListProvidersServices';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersServices;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersServices(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '67899876',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'john.treu@example.com',
      password: '67899876',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'john.qua@example.com',
      password: '67899876',
    });

    const providers1 = await listProviders.execute({
      user_id: loggedUser.id,
    });

    // const providers2 = await listProviders.execute({
    //   user_id: 'non-user',
    // });

    expect(providers1).toEqual([user1, user2]);
    // expect(providers2).toEqual([]);
  });
});
