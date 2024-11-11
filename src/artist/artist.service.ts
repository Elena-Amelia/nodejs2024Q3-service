import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import {
  albums,
  Artist,
  artists,
  tracks,
  favorites,
} from '../interfaces/interfaces';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { v4 } from 'uuid';

@Injectable()
export class ArtistService {
  create(dto: CreateArtistDto) {
    const artist: Artist = {
      id: v4(),
      name: dto.name,
      grammy: dto.grammy,
    };
    artists.push(artist);
    return artist;
  }

  getAll(): Artist[] {
    return artists;
  }

  getById(id: string): Artist {
    const existedArtist = artists.find((artist) => artist.id === id);

    if (existedArtist) {
      return existedArtist;
    } else {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
  }

  update(dto: UpdateArtistDto, id: string): Artist {
    const existedArtist = artists.find((artist) => {
      if (artist.id === id) {
        artist.name = dto.name;
        artist.grammy = dto.grammy;
        return true;
      }
    });

    if (existedArtist) {
      return existedArtist;
    } else {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
  delete(id: string) {
    const existedArtist = artists.find((artist, ind) => {
      if (artist.id === id) {
        artists.splice(ind, 1);

        tracks.find((elem) => {
          if (elem.artistId === id) {
            elem.artistId = null;
          }
        });

        albums.find((elem) => {
          if (elem.artistId === id) {
            elem.artistId = null;
          }
        });

        favorites.artists = favorites.artists.filter((elem) => elem !== id);
        return true;
      }
    });

    if (!existedArtist) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
