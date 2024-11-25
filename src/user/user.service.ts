import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const hash = await bcrypt.hash(dto.password, +process.env.CRYPT_SALT);
    const user = await this.prisma.user.create({
      data: {
        login: dto.login,
        password: hash,
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

    const oldPasswordMatches = await bcrypt.compare(
      dto.oldPassword,
      user.password,
    );
    if (oldPasswordMatches) {
      const hashNewPassword = await bcrypt.hash(
        dto.newPassword,
        +process.env.CRYPT_SALT,
      );
      const updatedUser = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          password: hashNewPassword,
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
      await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
