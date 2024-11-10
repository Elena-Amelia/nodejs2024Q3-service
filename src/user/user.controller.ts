import { Controller, Get, Post, Put, Body, Param, ParseUUIDPipe, Delete, HttpCode} from '@nestjs/common';
import { UserService } from './user.service';
import { User} from '../interfaces/interfaces';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): User[] {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id:string): User {
    return this.userService.getUserById(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto){
    return this.userService.createUser(createUserDto)
  }
  @Put(':id')
  update(@Body() updatePasswordDto: UpdatePasswordDto, @Param('id', new ParseUUIDPipe()) id:string): User {
    return this.userService.updateUserPassword(updatePasswordDto, id);
  }
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id:string) {
    return this.userService.deleteUser(id);
  }
}