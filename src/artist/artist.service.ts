import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoritesService } from 'src/favorite/favorite.service';

@Injectable()
export class ArtistService {
  constructor(
    private prisma: PrismaService,
    private favoriteService: FavoritesService,
  ) {}

  async create(dto: CreateArtistDto) {
    const artist = await this.prisma.artist.create({
      data: {
        name: dto.name,
        grammy: dto.grammy,
      },
    });
    return artist;
  }

  async getAll() {
    const artists = await this.prisma.artist.findMany();
    return artists;
  }

  async getById(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });

    if (!artist) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async update(dto: UpdateArtistDto, id: string) {
    try {
      const updatedArtist = await this.prisma.artist.update({
        where: {
          id,
        },
        data: {
          name: dto.name,
          grammy: dto.grammy,
        },
      });
      return updatedArtist;
    } catch (err) {
      if (err) {
        throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
      }
    }
  }

  async delete(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });

    if (!artist) {
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    }

    await this.favoriteService.deleteArtist(id);

    await this.prisma.artist.delete({
      where: {
        id,
      },
    });
  }
}
