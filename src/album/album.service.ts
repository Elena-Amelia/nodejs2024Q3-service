import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/Album.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAlbumDto) {
    const album = await this.prisma.album.create({
      data: {
        name: dto.name,
        year: dto.year,
        artistId: dto.artistId,
      },
    });
    return album;
  }

  async getAll() {
    const albums = await this.prisma.album.findMany();
    return albums;
  }

  async getById(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    if (!album) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }
    return album;
  }

  async update(dto: UpdateAlbumDto, id: string) {
    try {
      const updatedAlbum = await this.prisma.album.update({
        where: {
          id,
        },
        data: {
          name: dto.name,
          year: dto.year,
          artistId: dto.artistId,
        },
      });
      return updatedAlbum;
    } catch (err) {
      if (err) {
        throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
      }
    }
  }

  async delete(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    if (!album) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }

    const favoritesAlbums = await this.prisma.favorites.findUnique({
      where: { id: 1 },
      include: { albums: true },
    });

    if (favoritesAlbums) {
      await this.prisma.favorites.update({
        where: { id: 1 },
        data: {
          albums: {
            disconnect: { id: id },
          },
        },
      });
    }

    await this.prisma.album.delete({
      where: {
        id,
      },
    });
  }
}
