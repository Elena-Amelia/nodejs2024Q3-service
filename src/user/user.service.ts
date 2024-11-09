import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { User, users } from '../interfaces/interfaces';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { v4} from 'uuid';

@Injectable()
export class UserService {
  createUser(dto: CreateUserDto) {
    const user: User = {
      id: v4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    users.push(user);

    const validUser = Object.assign({}, user);
    delete validUser.password;
    return validUser;
  }

  getAllUsers(): User[] {
    const validUsers = users.map((user: User) => {
      const validUser = Object.assign({}, user);
      delete validUser.password;
      return validUser;
    });
    return validUsers;
  }

  getUserById(id: string): User {
    const existedUser = users.find((user) => user.id === id);

    if (existedUser) {
      const validUser = Object.assign({}, existedUser);
      delete validUser.password;
      return validUser;
    } else {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
  }

  updateUserPassword(dto: UpdatePasswordDto, id: string): User {
    const existedUser = users.find((user) => {
      if (user.id === id) {
        if (user.password === dto.oldPassword) {
          user.password = dto.newPassword;
          user.version++;
          user.updatedAt = Date.now();
          return true;
        } else {
          throw new HttpException(
            'Old password is wrong',
            HttpStatus.FORBIDDEN,
          );
        }
      }
    });

    if (existedUser) {
      const validUser = Object.assign({}, existedUser);
      delete validUser.password;
      return validUser;
    } else {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
  deleteUser(id: string) {
    const existedUser = users.find((user, ind) => {
      if (user.id === id) {
        users.splice(ind, 1);
        return true;
      }
    });

    if (!existedUser) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
