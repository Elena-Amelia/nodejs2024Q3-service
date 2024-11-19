import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/Album.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoritesService } from 'src/favorite/favorite.service';

@Injectable()
export class AlbumService {
  constructor(
    private prisma: PrismaService,
    private favoriteService: FavoritesService,
  ) {}

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
    
    await this.favoriteService.deleteAlbum(id);

    await this.prisma.album.delete({
      where: {
        id,
      },
    });
  }
}
