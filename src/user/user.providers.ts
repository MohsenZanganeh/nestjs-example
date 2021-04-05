import { User } from '../db-postgres/models/user.entity';

export const UsersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];
