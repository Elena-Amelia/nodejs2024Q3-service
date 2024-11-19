import { Exclude, Transform } from 'class-transformer';

export class UserEntity {
  id: string; // uuid v4
  login: string;

  @Exclude()
  password: string;

  version: number; // integer number, increments on update

  @Transform(({ value }) => +value)
  createdAt: Date;

  @Transform(({ value }) => +value)
  updatedAt: Date; // timestamp of last update

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
