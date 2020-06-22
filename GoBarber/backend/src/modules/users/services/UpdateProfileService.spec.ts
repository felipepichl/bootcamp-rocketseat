import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '67899876',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jonh Trê',
      email: 'jonhtre@exemple.com',
    });

    expect(updatedUser?.name).toBe('Jonh Trê');
    expect(updatedUser?.email).toBe('jonhtre@exemple.com');
  });

  it('should not be able update the profile from non-exixting user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-exixting-user-id',
        name: 'Jonh Trê',
        email: 'jonhtre@exemple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '67899876',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '67899876',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jonh Doe',
        email: 'john.doe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '67899876',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jonh Trê',
      email: 'jonhtre@exemple.com',
      old_password: '67899876',
      password: '12344321',
    });

    expect(updatedUser?.password).toBe('12344321');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '67899876',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jonh Trê',
        email: 'jonhtre@exemple.com',
        password: '12344321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '67899876',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jonh Trê',
        email: 'jonhtre@exemple.com',
        old_password: 'wrong-old-password',
        password: '12344321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
