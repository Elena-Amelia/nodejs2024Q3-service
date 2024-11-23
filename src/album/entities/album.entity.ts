import { Exclude } from 'class-transformer';

export class AlbumEntity {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string;

  @Exclude()
  favoritesId: number;

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
