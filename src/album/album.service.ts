import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Album, albums, tracks, favorites } from '../interfaces/interfaces';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/Album.dto';
import { v4 } from 'uuid';

@Injectable()
export class AlbumService {
  create(dto: CreateAlbumDto) {
    const album: Album = {
      id: v4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    };
    albums.push(album);
    return album;
  }

  getAll(): Album[] {
    return albums;
  }

  getById(id: string): Album {
    const existedAlbum = albums.find((album) => album.id === id);

    if (existedAlbum) {
      return existedAlbum;
    } else {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }
  }

  update(dto: UpdateAlbumDto, id: string): Album {
    const existedAlbum = albums.find((album) => {
      if (album.id === id) {
        album.name = dto.name;
        album.year = dto.year;
        album.artistId = dto.artistId;
        return true;
      }
    });

    if (existedAlbum) {
      return existedAlbum;
    } else {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }
  }

  delete(id: string) {
    const existedAlbum = albums.find((album, ind) => {
      if (album.id === id) {
        albums.splice(ind, 1);
        tracks
          .filter((elem) => elem.albumId === id)
          .forEach((elem) => (elem.albumId = null));

        favorites.albums = favorites.albums.filter((elem) => elem !== id);
        return true;
      }
    });

    if (!existedAlbum) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
