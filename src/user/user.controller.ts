import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  Body,
  Request,
  Response,
  Query,
  HttpException,
  UseFilters,
  HttpStatus,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { User } from '../db-postgres/models/user.entity';
import { UserService } from './user.service';
import { USER } from './userInterface';
import { CreateUserDto } from './dto/createUserDto';
import { DeleteUserDto } from './dto/deleteUserDto';
import { paramDto } from './dto/paramDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { HttpExceptionFilter } from '../http-exception.filter';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly userService: UserService,
    private readonly i18n: I18nService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'get users' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getUsers(@Query() query): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post()
  @ApiOperation({ summary: 'create user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseFilters(new HttpExceptionFilter())
  async insertUsers(@Body() CreateUserDto: CreateUserDto): Promise<USER> {
    const user = await this.userService.createUser(CreateUserDto);
    // throw { status: '400' };

    const message = await this.i18n.translate('user.HELLO_MESSAGE', {
      lang: 'en',
      args: { username: 'Toon' },
    });
    console.log('--message:', message);

    this.logger.error('heloooooooo');
    // throw new HttpException('Forbidden', 1001);
    return user;
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'update user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updatesers(
    @Body() UpdateUserDto: UpdateUserDto,
    @Param() Params: paramDto,
  ): Promise<string> {
    const user = await this.userService.updateUser(Params.id, UpdateUserDto);
    if (user > 0) {
      return 'updated successfully';
    }
    return 'updated Field';
  }
  @Delete('/:id')
  @ApiOperation({ summary: 'delete user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async deleteUser(@Param() Params: DeleteUserDto): Promise<string> {
    const user = await this.userService.deleteUser(Params.id);
    if (user > 0) {
      return 'deleted successfully';
    }
    return 'deleted Field';
  }
}
