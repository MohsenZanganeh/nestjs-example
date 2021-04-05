import { Injectable, Inject } from '@nestjs/common';
import { User } from '../db-postgres/models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof User,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.findAll<User>();
  }
  async createUser(data): Promise<User> {
    const user = await this.usersRepository.create(data);
    return user;
  }
  async updateUser(id, data): Promise<number> {
    const user = await this.usersRepository.update(data, { where: { id } });
    return user[0];
  }
  async deleteUser(id): Promise<number> {
    const user = await this.usersRepository.destroy({ where: { id } });
    return user;
  }
}
