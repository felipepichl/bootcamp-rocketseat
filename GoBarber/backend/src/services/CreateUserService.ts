import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserServices {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExistis = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExistis) {
      throw new AppError('Email address already used.');
    }

    const hasedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hasedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserServices;
