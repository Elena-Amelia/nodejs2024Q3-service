import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTrackDto) {
    const track = await this.prisma.track.create({
      data: {
        name: dto.name,
        duration: dto.duration,
        artistId: dto.artistId,
        albumId: dto.albumId,
      },
    });

    return track;
  }

  async getAll() {
    const tracks = await this.prisma.track.findMany();
    return tracks;
  }

  async getById(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });

    if (!track) {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }
    return track;
  }

  async update(dto: UpdateTrackDto, id: string) {
    try {
      const updatedTrack = await this.prisma.track.update({
        where: {
          id,
        },
        data: {
          name: dto.name,
          duration: dto.duration,
          artistId: dto.artistId,
          albumId: dto.albumId,
        },
      });
      return updatedTrack;
    } catch (err) {
      if (err) {
        throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
      }
    }
  }

  async delete(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });

    if (!track) {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }

    await this.prisma.track.delete({
      where: {
        id,
      },
    });
  }
}
