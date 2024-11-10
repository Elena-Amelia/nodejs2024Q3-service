import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import {
  Favorites,
  FavoritesResponse,
  artists,
  favorites,
  tracks, albums
} from '../interfaces/interfaces';

import { v4 } from 'uuid';

@Injectable()
export class FavoritesService {
  getAll(): FavoritesResponse {
    return {
        artists: artists.filter((artist) => favorites.artists.includes(artist.id)),
        albums: albums.filter((album) => favorites.albums.includes(album.id)),
        tracks: tracks.filter((track) => favorites.tracks.includes(track.id)),
    }
  }

  createTrack(id: string) {
    favorites.tracks.find((trackId) => {
      if (trackId === id) {
        throw new HttpException(
          'Track already exists in Favorites',
          HttpStatus.BAD_REQUEST,
        );
      }
    });

    const track = tracks.find((track) => track.id === id);

    if (track) {
      favorites.tracks.push(track.id);
      return `Track ${id} was added to Favorites`;
    } else {
      throw new HttpException(
        "Track doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  removeTrack(id: string) {
    const favTrackIndex = favorites.tracks.indexOf(id);

    if (favTrackIndex !== -1) {
      favorites.tracks.splice(favTrackIndex, 1);

    } else {
      throw new HttpException(
        "Track doesn't exist in Favorites",
        HttpStatus.NOT_FOUND,
      );
    }
  }

  createArtist(id: string) {
    favorites.artists.find((artistId) => {
      if (artistId === id) {
        throw new HttpException(
          'Artist already exists in Favorites',
          HttpStatus.BAD_REQUEST,
        );
      }
    });

    const artist = artists.find((artist) => artist.id === id);

    if (artist) {
      favorites.artists.push(artist.id);
      return `Track ${id} was added to Favorites`;
    } else {
      throw new HttpException(
        "Artist doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  removeArtist(id: string) {
    const artistIndex = favorites.artists.indexOf(id);

    if (artistIndex !== -1) {
      favorites.artists.splice(artistIndex, 1);

    } else {
      throw new HttpException(
        "Track doesn't exist in Favorites",
        HttpStatus.NOT_FOUND,
      );
    }
  }
  createAlbum(id: string) {
    favorites.albums.find((albumId) => {
      if (albumId === id) {
        throw new HttpException(
          'Artist already exists in Favorites',
          HttpStatus.BAD_REQUEST,
        );
      }
    });

    const album = albums.find((album) => album.id === id);

    if (album) {
      favorites.albums.push(album.id);
      return `Track ${id} was added to Favorites`;
    } else {
      throw new HttpException(
        "Artist doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  removeAlbum(id: string) {
    const albumIndex = favorites.albums.indexOf(id);

    if (albumIndex !== -1) {
      favorites.albums.splice(albumIndex, 1);

    } else {
      throw new HttpException(
        "Track doesn't exist in Favorites",
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
