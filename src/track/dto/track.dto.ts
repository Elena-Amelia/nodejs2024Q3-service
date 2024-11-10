import { IsNotEmpty, IsString, IsInt, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  duration: number;

  @ValidateIf((o, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  artistId: string;

  @ValidateIf((o, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  albumId: string;
}

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  duration: number;

  @ValidateIf((o, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  artistId: string;

  @ValidateIf((o, value) => value !== null)
  @IsNotEmpty()
  @IsString()
  albumId: string;
}
