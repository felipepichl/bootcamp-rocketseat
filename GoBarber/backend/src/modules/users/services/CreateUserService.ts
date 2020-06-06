import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExistis = await this.usersRepository.findByEmail(email);

    if (checkUserExistis) {
      throw new AppError('Email address already used.');
    }

    const hasedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hasedPassword,
    });

    return user;
  }
}

export default CreateUserServices;
