import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '67899876',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile?.name).toBe('John Doe');
    expect(profile?.email).toBe('john.doe@example.com');
  });

  it('should not be able show the profile from non-exixting user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-exixting-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
