import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsersProviders } from './user.providers';
import { dataBaseModule } from '../db-postgres/database.module';

@Module({
  imports: [dataBaseModule],
  controllers: [UserController],
  providers: [UserService, ...UsersProviders],
})
export class UserModule {}
