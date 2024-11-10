import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateIf
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ValidateIf((o, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  artistId: string;
}

export class UpdateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ValidateIf((o, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  artistId: string;
}
