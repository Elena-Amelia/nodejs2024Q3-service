import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        login: dto.login,
        password: dto.password,
      },
    });

    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(dto: UpdatePasswordDto, id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }

    if (user.password === dto.oldPassword) {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          password: dto.newPassword,
          version: ++user.version,
        },
      });
      return updatedUser;
    } else {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
