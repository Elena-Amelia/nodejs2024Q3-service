import { HttpException, Injectable, HttpStatus } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { Album, Artist, Track } from '@prisma/client';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async isFavorites() {
    return await this.prisma.favorites.findUnique({
      where: { id: 1 },
    });
  }

  async getAll() {
    const favorites = await this.prisma.favorites.findUnique({
      where: { id: 1 },
      include: {
        artists: true,
        tracks: true,
        albums: true,
      },
    });

    const result = { ...{ albums: [], tracks: [], artists: [] }, ...favorites };
    delete result.id;
    for (const key in result) {
      result[key].filter(
        (item: Album | Artist | Track) => delete item.favoritesId,
      );
    }

    return result;
  }

  async createTrack(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    if (!track) {
      throw new HttpException(
        "Track doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isFavorites = await this.isFavorites();

    if (!isFavorites) {
      const favorites = await this.prisma.favorites.create({
        data: {
          id: 1,
          tracks: {
            connect: { id: id },
          },
        },
        include: {
          tracks: true,
        },
      });
      const newTrack = favorites.tracks.find((track) => track.id === id);
      delete newTrack.favoritesId;
      return newTrack;
    }

    const updatedFavTracks = await this.prisma.favorites.update({
      where: { id: 1 },
      data: {
        tracks: {
          connect: { id: id },
        },
      },
      include: {
        tracks: true,
      },
    });
    const newTrack = updatedFavTracks.tracks.find((track) => track.id === id);
    delete newTrack.favoritesId;
    return newTrack;
  }

  async deleteTrack(id: string) {
    const favorites = await this.prisma.favorites.findUnique({
      where: { id: 1 },
      include: { tracks: true },
    });

    if (!favorites) {
      throw new HttpException(
        "Track doesn't exist in Favorites",
        HttpStatus.NOT_FOUND,
      );
    }

    const trackInd = favorites.tracks.findIndex((track) => track.id === id);

    if (trackInd === -1) {
      throw new HttpException(
        "Track doesn't exist in Favorites",
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.favorites.update({
      where: { id: 1 },
      data: {
        tracks: {
          disconnect: { id: id },
        },
      },
    });
  }

  async createArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) {
      throw new HttpException(
        "Artist doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isFavorites = await this.isFavorites();

    if (!isFavorites) {
      const createdArtists = await this.prisma.favorites.create({
        data: {
          id: 1,
          artists: {
            connect: { id: id },
          },
        },
        include: {
          artists: true,
        },
      });
      const newArtist = createdArtists.artists.find(
        (artist) => artist.id === id,
      );
      delete newArtist.favoritesId;
      return newArtist;
    }

    const updatedFavArtists = await this.prisma.favorites.update({
      where: { id: 1 },
      data: {
        artists: {
          connect: { id: id },
        },
      },
      include: {
        artists: true,
      },
    });
    const newArtist = updatedFavArtists.artists.find(
      (artist) => artist.id === id,
    );
    delete newArtist.favoritesId;
    return newArtist;
  }

  async deleteArtist(id: string) {
    const favorites = await this.prisma.favorites.findUnique({
      where: { id: 1 },
      include: { artists: true },
    });
    if (!favorites) {
      throw new HttpException(
        "Artist doesn't exist in Favorites",
        HttpStatus.NOT_FOUND,
      );
    }

    const artistInd = favorites.artists.findIndex((artist) => artist.id === id);
    if (artistInd === -1) {
      throw new HttpException(
        "Artist doesn't exist in Favorites",
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.favorites.update({
      where: { id: 1 },
      data: {
        artists: {
          disconnect: { id: id },
        },
      },
    });
  }

  async createAlbum(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!album) {
      throw new HttpException(
        "Album doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isFavorites = await this.isFavorites();

    if (!isFavorites) {
      const createdAlbums = await this.prisma.favorites.create({
        data: {
          id: 1,
          albums: {
            connect: { id: id },
          },
        },
        include: {
          albums: true,
        },
      });
      const newAlbum = createdAlbums.albums.find((album) => album.id === id);
      delete newAlbum.favoritesId;
      return newAlbum;
    }

    const updatedFavAlbums = await this.prisma.favorites.update({
      where: { id: 1 },
      data: {
        albums: {
          connect: { id: id },
        },
      },
      include: {
        albums: true,
      },
    });
    const newAlbum = updatedFavAlbums.albums.find((album) => album.id === id);
    delete newAlbum.favoritesId;
    return newAlbum;
  }

  async deleteAlbum(id: string) {
    const favorites = await this.prisma.favorites.findUnique({
      where: { id: 1 },
      include: { albums: true },
    });

    if (!favorites) {
      throw new HttpException(
        "Album doesn't exist in Favorites",
        HttpStatus.NOT_FOUND,
      );
    }

    const albumInd = favorites.albums.findIndex((album) => album.id === id);
    if (albumInd === -1) {
      throw new HttpException(
        "Album doesn't exist in Favorites",
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.favorites.update({
      where: { id: 1 },
      data: {
        albums: {
          disconnect: { id: id },
        },
      },
    });
  }
}
