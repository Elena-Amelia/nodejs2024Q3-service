import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class SignUpUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  @ValidateIf((_, value) => value !== undefined)
  refreshToken: string;
}
