import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Album, albums, tracks } from '../interfaces/interfaces';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/Album.dto';
import { v4 } from 'uuid';

@Injectable()
export class AlbumService {
  createAlbum(dto: CreateAlbumDto) {
    const album: Album = {
      id: v4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    };
    albums.push(album);
    return album;
  }

  getAllAlbums(): Album[] {
    return albums;
  }

  getAlbumById(id: string): Album {
    const existedAlbum = albums.find((album) => album.id === id);

    if (existedAlbum) {
      return existedAlbum;
    } else {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }
  }

  updateAlbum(dto: UpdateAlbumDto, id: string): Album {
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
  deleteAlbum(id: string) {
    const existedAlbum = albums.find((album, ind) => {
      if (album.id === id) {


        tracks.find((elem) => {
          if (elem.albumId === id) {
            elem.albumId = null;
          }
        })

        albums.splice(ind, 1);
        return true;
      }
    });

    if (!existedAlbum) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
