import { Exclude } from 'class-transformer';

export class TrackEntity {
  id: string; // uuid v4
  name: string;
  duration: number;
  artistId: string;
  albumId: string;

  @Exclude()
  favoritesId: number;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
