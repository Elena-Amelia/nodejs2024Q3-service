import { Exclude } from 'class-transformer';

export class ArtistEntity {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  @Exclude()
  favoritesId: number;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
