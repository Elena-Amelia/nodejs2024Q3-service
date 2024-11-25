import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, RefreshTokenDto, SignUpUserDto } from './dto/auth.dto';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signup(dto: SignUpUserDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        login: dto.login,
      },
    });

    if (foundUser) {
      throw new HttpException('User is already exist', HttpStatus.BAD_REQUEST);
    }

    const hash = await bcrypt.hash(dto.password, +process.env.CRYPT_SALT);
    const newUser = await this.prisma.user.create({
      data: {
        login: dto.login,
        password: hash,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.login);

    const { id } = newUser;
    return { id, ...tokens };
  }

  async login(dto: LoginUserDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        login: dto.login,
      },
    });

    if (!foundUser) {
      throw new HttpException('Wrong login or password', HttpStatus.NOT_FOUND);
    }

    const passwordMatches = await bcrypt.compare(
      dto.password,
      foundUser.password,
    );
    if (!passwordMatches) {
      throw new HttpException('Password is wrong', HttpStatus.NOT_FOUND);
    }

    const tokens = await this.getTokens(foundUser.id, foundUser.login);
    const { id } = foundUser;
    return { id, ...tokens };
  }

  async getTokens(userId: string, login: string) {
    const payload = { userId, login };

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_KEY,
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(dto: RefreshTokenDto) {
    if (!dto.refreshToken) {
      throw new HttpException(
        'No refreshToken in body',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const payload = await this.jwt.verifyAsync(dto.refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      const token = await this.getTokens(payload.userId, payload.login);
      return token;
    } catch {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
  }
}
