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
} from '@nestjs/common';
import { User } from '../db-postgres/models/user.entity';
import { UserService } from './user.service';
import { USER } from './userInterface';
import { CreateUserDto } from './dto/createUserDto';
import { DeleteUserDto } from './dto/deleteUserDto';
import { paramDto } from './dto/paramDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { HttpExceptionFilter } from '../http-exception.filter';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  @ApiOperation({ summary: 'get users' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getUsers(@Query() query): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post('/users')
  @ApiOperation({ summary: 'create user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseFilters(new HttpExceptionFilter())
  async insertUsers(@Body() CreateUserDto: CreateUserDto): Promise<USER> {
    // const user = await this.userService.createUser(CreateUserDto);
    // throw { status: '400' };
    throw new HttpException('Forbidden', 1001);
    // return user;
  }

  @Patch('/users/:id')
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
  @Delete('/users/:id')
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
