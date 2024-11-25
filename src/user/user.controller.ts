import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseUUIDPipe,
  Delete,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    const users = await this.userService.getAllUsers();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.getUserById(id);
    return new UserEntity(user);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return new UserEntity(user);
  }

  @Put(':id')
  async update(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const user = await this.userService.update(updatePasswordDto, id);
    return new UserEntity(user);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.deleteUser(id);
  }
}
